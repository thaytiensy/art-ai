// Script to generate complete curriculum dataset for all 45 units of SGK Kết Nối Tri Thức
const fs = require('fs');
const path = require('path');

// Helper to build unit object
function buildUnit(u) {
  return {
    id: `kntt_g${u.grade}_cd${u.unitNum}`,
    grade: u.grade,
    gradeLabel: `Lớp ${u.grade}`,
    bookSeries: 'Kết nối tri thức với cuộc sống',
    unitNumber: `Chủ đề ${u.unitNum}`,
    title: u.title,
    duration: u.duration || '2 tiết',
    icon: u.icon,
    tag: u.tag,
    summary: u.summary,
    wordLessonPlan: {
      title: `KẾ HOẠCH BÀI DẠY MĨ THUẬT LỚP ${u.grade}`,
      unit: `Chủ đề ${u.unitNum}: ${u.title.toUpperCase()}`,
      book: 'Bộ sách: Kết nối tri thức với cuộc sống - NXB Giáo dục Việt Nam',
      objectives: u.objectives,
      preparations: u.preparations,
      activities: u.activities
    },
    powerpointSlides: [
      {
        slideNumber: 1,
        phase: '1. Khởi động',
        phaseIcon: '🎯',
        title: `1. KHỞI ĐỘNG: ${u.title.toUpperCase()}`,
        subtitle: 'Tiến trình 1: Khởi động (5 phút) • Khơi nguồn cảm hứng & Đố vui mĩ thuật',
        teacherLecture: u.s1Lecture,
        bullets: [
          `Khám phá vẻ đẹp độc đáo của chủ đề ${u.title}`,
          `Quan sát hình ảnh thực tế và khơi nguồn cảm xúc nghệ thuật`,
          'Sẵn sàng đồ dùng học vẽ để cùng Thầy bước vào thế giới sáng tạo'
        ],
        badge: `${u.icon} 1. Khởi động`,
        interactiveAction: {
          type: 'quiz',
          label: '❓ Đố Vui Khởi Động Cùng Thầy',
          question: u.quizQ,
          options: u.quizOpts,
          correctIndex: u.quizCorr,
          explanation: u.quizExp
        }
      },
      {
        slideNumber: 2,
        phase: '2. Khám phá',
        phaseIcon: '🔍',
        title: `2. QUAN SÁT & KHÁM PHÁ: ${u.title.toUpperCase()}`,
        subtitle: 'Tiến trình 2: Quan sát nhận biết (10 phút) • Phân tích đường nét, màu sắc và hình khối',
        teacherLecture: u.s2Lecture,
        bullets: u.s2Bullets,
        badge: '🔍 2. Khám phá tri thức',
        interactiveAction: {
          type: 'explore',
          label: '🔎 Khám Phá Nét Đẹp Tác Phẩm',
          detail: `Tập trung phân tích kỹ thuật tạo hình và hòa sắc độc đáo của chủ đề ${u.title}.`
        }
      },
      {
        slideNumber: 3,
        phase: '3. Thực hành',
        phaseIcon: '💡',
        title: `3. BÍ QUYẾT TẠO HÌNH & THỊ PHẠM CỦA THẦY`,
        subtitle: 'Tiến trình 3: Luyện tập sáng tạo (15 phút) • Hướng dẫn các bước thực hành từng bước',
        teacherLecture: u.s3Lecture,
        bullets: u.s3Bullets,
        badge: '💡 3. Thực hành sáng tạo',
        interactiveAction: {
          type: 'draw',
          label: '🎨 Mở Bảng Vẽ Làm Theo Lời Thầy'
        }
      },
      {
        slideNumber: 4,
        phase: '4. Trưng bày',
        phaseIcon: '🏅',
        title: `4. GÓC TRIỂN LÃM & ĐÁNH GIÁ THEO RUBRIC`,
        subtitle: 'Tiến trình 4: Trưng bày chia sẻ (5 phút) • Đánh giá theo 4 Tiêu chí Rubric GDPT 2018',
        teacherLecture: u.s4Lecture,
        bullets: u.s4Bullets,
        badge: '🏅 4. Trưng bày & Đánh giá',
        interactiveAction: {
          type: 'critique',
          label: '📸 Nhờ Mắt Thần Chấm Tranh Của Con'
        }
      },
      {
        slideNumber: 5,
        phase: '5. Vận dụng',
        phaseIcon: '🚀',
        title: `5. VẬN DỤNG & SÁNG TẠO VÀO ĐỜI SỐNG`,
        subtitle: 'Tiến trình 5: Vận dụng phát triển (5 phút) • Đưa cái đẹp mĩ thuật vào cuộc sống quanh em',
        teacherLecture: u.s5Lecture,
        bullets: u.s5Bullets,
        badge: '🚀 5. Vận dụng đời sống',
        interactiveAction: {
          type: 'apply',
          label: '🌟 Thử Thách Sáng Tạo Tại Nhà'
        }
      }
    ]
  };
}

module.exports = { buildUnit };
