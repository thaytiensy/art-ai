// Unified AI Vision Service for Thầy Giáo Mĩ Thuật (Thầy Cọ Nhí)

export async function analyzeKidsArtwork(imageBase64, apiKey, promptContext = '', teacher = { name: 'Thầy Cọ Nhí', pronoun: 'Thầy', title: 'Thầy giáo', gender: 'male' }) {
  let cleanBase64 = imageBase64;
  let mimeType = 'image/png';
  let fullDataUrl = imageBase64;
  
  if (imageBase64.includes(';base64,')) {
    const parts = imageBase64.split(';base64,');
    mimeType = parts[0].replace('data:', '');
    cleanBase64 = parts[1];
    fullDataUrl = imageBase64;
  } else {
    fullDataUrl = `data:image/png;base64,${imageBase64}`;
  }

  const teacherName = teacher?.name || 'Thầy Cọ Nhí';
  const pronoun = teacher?.pronoun || 'Thầy';

  const systemInstruction = `
Bạn là "${teacherName}" - Thầy giáo Mĩ thuật Tiểu học (dành cho các bé lớp 1 đến lớp 5) vô cùng ấm áp, vui tươi, am hiểu nghệ thuật và tràn đầy năng lượng tích cực.
Nhiệm vụ: Xem bức tranh vẽ của bé và đưa ra nhận xét theo chuẩn Mĩ thuật Tiểu học GDPT 2018 (Thông tư 32/2018/TT-BGDĐT):

QUY TẮC BẮT BUỘC:
1. LUÔN KHÍCH LỆ: Tuyệt đối không chê bai nét vẽ non nớt của trẻ. Mỗi bức tranh của bé đều là một tác phẩm độc nhất vô nhị!
2. PHƯƠNG PHÁP BÁNH MÌ KẸP (SANDWICH FEEDBACK):
   - Bước 1: Khen ngợi thật nồng nhiệt 2 điểm sáng tạo nhất (màu sắc tươi vui, nét bút tự tin, ý tưởng độc đáo).
   - Bước 2: Gợi ý 1 mẹo nhỏ xíu dễ hiểu (ví dụ: tô thêm bóng râm, vẽ thêm ông mặt trời hoặc mây bồng bềnh).
   - Bước 3: Trao tặng Huy hiệu Bé Sáng Tạo & Động viên con vẽ tiếp.
3. NGÔN NGỮ: Xưng "${pronoun}" và gọi bé là "Họa sĩ nhí" hoặc "Con". Dùng từ ngữ đáng yêu, truyền cảm hứng, nhiều emoji.
4. ĐÁNH GIÁ ĐIỂM: Luôn cho điểm 10/10 kèm danh hiệu vui nhộn (ví dụ: "Bậc Thầy Sắc Màu Nhí", "Cây Cọ Vàng Tương Lai").
`;

  const trimmedKey = (apiKey || '').trim();

  // 1. NẾU DÙNG HUGGING FACE TOKEN (Bắt đầu bằng hf_)
  if (trimmedKey.startsWith('hf_')) {
    try {
      const hfEndpoint = 'https://router.huggingface.co/hf-inference/v1/chat/completions';
      const requestBody = {
        model: 'Qwen/Qwen2.5-VL-7B-Instruct',
        messages: [
          {
            role: 'system',
            content: systemInstruction
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Bé vừa gửi bức tranh này cho ${pronoun}. Bé có nhắn: "${promptContext || `Nhờ ${teacherName} nhận xét bài vẽ của con ạ!`}". Hãy nhận xét cho bé nhé!`
              },
              {
                type: 'image_url',
                image_url: {
                  url: fullDataUrl
                }
              }
            ]
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      };

      const res = await fetch(hfEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${trimmedKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return parseFeedback(text, teacherName);
      }
    } catch (err) {
      console.warn('Hugging Face API call failed:', err);
    }
    return fallbackCritique(promptContext, teacher);
  }

  // 2. NẾU DÙNG GOOGLE GEMINI KEY
  if (trimmedKey.length > 10) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${trimmedKey}`;
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `${systemInstruction}\n\nBé vừa gửi bức tranh này cho ${pronoun}. Bé có nhắn: "${promptContext || `Nhờ ${teacherName} nhận xét bài vẽ của con ạ!`}". Hãy nhận xét cho bé nhé!`
              },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        const feedbackText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (feedbackText) {
          return parseFeedback(feedbackText, teacherName);
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed:', err);
    }
  }

  // 3. Fallback demo critique
  return fallbackCritique(promptContext, teacher);
}

function parseFeedback(text, teacherName) {
  return {
    raw: text,
    score: 10,
    badge: '🏆 Họa Sĩ Nhí Xuất Sắc',
    teacher: teacherName,
    praise: extractSection(text, ['khen', 'điểm tốt', 'lời khen']) || 'Bức tranh của con tràn ngập màu sắc rực rỡ và nét vẽ vô cùng hồn nhiên, đáng yêu!',
    tip: extractSection(text, ['gợi ý', 'mẹo nhỏ', 'cải thiện', 'để đẹp hơn']) || 'Con có thể tô thêm chút màu xanh biếc của bầu trời hoặc vẽ thêm vài chú chim nhỏ xíu bay lượn nhé!',
    conclusion: `${teacherName} rất tự hào về tác phẩm này của con. Hãy tiếp tục cầm cọ và sáng tạo thêm nhiều bức tranh tuyệt đẹp nữa nha!`
  };
}

function extractSection(text, keywords) {
  const lines = text.split('\n');
  let matched = [];
  let recording = false;

  for (const line of lines) {
    const lower = line.toLowerCase();
    const isKeyword = keywords.some(k => lower.includes(k));
    
    if (isKeyword) {
      recording = true;
      matched.push(line.replace(/^[#*-\d.\s]+/, ''));
      continue;
    }

    if (recording) {
      if (line.trim().startsWith('#') || line.trim().startsWith('1.') || line.trim().startsWith('2.') || line.trim().startsWith('3.')) {
        if (!isKeyword) break;
      }
      if (line.trim()) matched.push(line.trim());
    }
  }

  return matched.slice(0, 3).join(' ');
}

function fallbackCritique(context = '', teacher = { name: 'Thầy Cọ Nhí', pronoun: 'Thầy' }) {
  const teacherName = teacher.name || 'Thầy Cọ Nhí';
  const pronoun = teacher.pronoun || 'Thầy';

  const praises = [
    `Oa, ${pronoun} nhìn thấy một bức tranh tràn đầy năng lượng và sắc màu vui tươi của con!`,
    `Bé yêu vẽ nét bút rất dứt khoát và tự tin đấy! Trông bức tranh sống động như đang chuyển động vậy.`,
    `Cách con chọn màu sắc thật rực rỡ và ấm áp, đúng chất một họa sĩ nhí đầy tiềm năng!`
  ];

  const tips = [
    `Mẹo nhỏ của ${pronoun}: Con hãy thử vẽ thêm một vài đám mây trắng bồng bềnh và ông mặt trời mỉm cười ở góc tranh nhé!`,
    `Bí quyết họa sĩ: Nếu con nhấn thêm một chút bóng râm màu đậm hơn ở bên dưới, bức tranh sẽ có chiều sâu 3D thần kỳ đấy!`,
    `Gợi ý nho nhỏ: Con có thể tô màu kín đều các mảng trắng còn sót lại để tác phẩm hoàn hảo như tranh trong viện bảo tàng nha.`
  ];

  const badges = [
    "🌟 Bé Sáng Tạo Cừ Khôi",
    "🎨 Phù Thủy Sắc Màu Nhí",
    "🏆 Cây Cọ Vàng Tiểu Học",
    "💖 Bàn Tay Khéo Léo"
  ];

  const randomPraise = praises[Math.floor(Math.random() * praises.length)];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  const randomBadge = badges[Math.floor(Math.random() * badges.length)];

  const fullText = `Chào Họa sĩ nhí của ${teacherName}! 🎨✨\n\n` +
    `💖 **LỜI KHEN NGỌT NGÀO:**\n${randomPraise}\n\n` +
    `💡 **MẸO NHỎ HỌA SĨ NHÍ:**\n${randomTip}\n\n` +
    `🎉 **ĐÁNH GIÁ CHUẨN MĨ THUẬT:** 10/10 Điểm!\n` +
    `Con nhận được danh hiệu: **${randomBadge}**!\n\n` +
    `${pronoun} rất mong chờ được ngắm thêm các bức tranh tiếp theo của con. Hãy luôn tự tin sáng tạo nhé! 🌸`;

  return {
    raw: fullText,
    score: 10,
    badge: randomBadge,
    teacher: teacherName,
    praise: randomPraise,
    tip: randomTip,
    conclusion: `${teacherName} rất yêu thích sự sáng tạo của con! Cố gắng phát huy con nhé!`
  };
}

export async function generateTeacherResponse(userMessage, unit, apiKey, teacher = { name: 'Thầy Cọ Nhí', pronoun: 'Thầy' }) {
  const teacherName = teacher?.name || 'Thầy Cọ Nhí';
  const pronoun = teacher?.pronoun || 'Thầy';
  const unitTitle = unit?.title || 'Bài học Mĩ thuật';

  // Check if student is asking for a sample drawing or sketch
  const isAskingForImage = /vẽ mẫu|tranh mẫu|xem hình|cho con xem|hình mẫu|xem tranh/i.test(userMessage);
  let imageUrl = null;
  if (isAskingForImage) {
    const prompt = encodeURIComponent(`cute colorful children book illustration, primary school art for ${unitTitle}, simple cheerful watercolor style, by master artist`);
    imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=600&height=400&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
  }

  const trimmedKey = (apiKey || '').trim();

  // 1. Google Gemini Flash API
  if (trimmedKey && !trimmedKey.startsWith('hf_')) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${trimmedKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Bạn là "${teacherName}" - Thầy giáo Mĩ thuật Tiểu học (SGK Kết nối tri thức với cuộc sống).
Bài học hiện tại: "${unitTitle}" (Khối lớp ${unit?.grade || 1}).
Học sinh hỏi: "${userMessage}"
Hãy trả lời bé bằng giọng điệu ấm áp, xưng "${pronoun}", động viên, hướng dẫn vẽ từng bước dễ hiểu theo chuẩn sư phạm GDPT 2018 (tối đa 3-4 câu ngắn gọn, nhiều emoji sinh động).`
              }]
            }]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return {
            text: replyText.trim(),
            imageUrl
          };
        }
      }
    } catch (e) {
      console.warn('Gemini chat error, fallback to local response:', e);
    }
  }

  // 2. Intelligent Pedagogical Fallback Response
  let replyText = `${teacherName} chào con! Về bài học "${unitTitle}", ${pronoun} khuyên con hãy bắt đầu phác các nét lớn hình học trước, sau đó phối màu tương phản thật tươi sáng. Con hãy thử vẽ ngay trên Bảng vẽ nhé! 🎨✨`;

  if (/pha màu|màu sắc/i.test(userMessage)) {
    replyText = `Bí quyết của ${pronoun} đây: Con hãy dùng 3 màu gốc Đỏ, Vàng, Lam nhé. Đỏ pha Vàng thành Cam ấm áp, Vàng pha Lam thành Xanh lá mát rượi đấy! 🌈`;
  } else if (/xa gần|không gian|phối cảnh/i.test(userMessage)) {
    replyText = `Công thức luật xa gần của ${pronoun} cực dễ nhớ: "Gần thì To và Rõ, Xa thì Nhỏ và Mờ". Con kẻ đường chân trời ở khoảng một phần ba tranh là chuẩn nhất nha! 🌾`;
  } else if (/đẹp|khen/i.test(userMessage)) {
    replyText = `${pronoun} tin chắc bức tranh của con sẽ rất xuất sắc! Mỗi nét vẽ tự tin của con đều chứa đựng sự sáng tạo tuyệt vời. Cố lên con nhé! 🌟`;
  }

  return {
    text: replyText,
    imageUrl
  };
}
