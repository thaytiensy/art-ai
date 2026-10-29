// The Metropolitan Museum of Art Open Access API (Free CC0, No API Key needed)

export async function fetchMasterpieceArtworks() {
  // Pre-curated list of famous kid-friendly masterpieces from The Met & Open Access
  return [
    {
      id: 436535,
      title: 'Hoa Diên Vĩ (Irises)',
      artist: 'Vincent van Gogh',
      year: '1890',
      imageUrl: 'https://images.metmuseum.org/CRDImages/ep/original/DT1947.jpg',
      story: 'Họa sĩ Van Gogh rất yêu thích thiên nhiên. Bác ấy dùng màu tím rực rỡ và xanh lá tươi mát để vẽ những bông hoa đang khiêu vũ dưới ánh nắng mặt trời!'
    },
    {
      id: 437980,
      title: 'Hoa Hướng Dương (Sunflowers)',
      artist: 'Vincent van Gogh',
      year: '1887',
      imageUrl: 'https://images.metmuseum.org/CRDImages/ep/original/DP-20490-001.jpg',
      story: 'Bác Van Gogh dùng gam màu vàng ấm áp như ánh nắng để vẽ những đóa hoa hướng dương tràn ngập niềm vui và hy vọng.'
    },
    {
      id: 438014,
      title: 'Hồ Hoa Súng (Water Lilies)',
      artist: 'Claude Monet',
      year: '1899',
      imageUrl: 'https://images.metmuseum.org/CRDImages/ep/original/DP-14936-001.jpg',
      story: 'Bác Monet đã xây hẳn một cây cầu gỗ nhỏ bắc qua hồ hoa súng trong khu vườn của mình để ngồi vẽ những gợn sóng lấp lánh phản chiếu mây trời.'
    },
    {
      id: 437056,
      title: 'Hai Chú Mèo Con Nghịch Ngợm',
      artist: 'Henriëtte Ronner-Knip',
      year: '1893',
      imageUrl: 'https://images.metmuseum.org/CRDImages/ep/original/DP169335.jpg',
      story: 'Nữ họa sĩ Ronner-Knip rất yêu động vật. Cô ấy quan sát từng sợi lông mềm mượt và đôi mắt tròn xoe hiếu động của những chú mèo con để đưa vào tranh.'
    }
  ];
}
