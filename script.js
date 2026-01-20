// Botão de voltar na página de oração
document.addEventListener('DOMContentLoaded', function() {
  var btnVoltarOracao = document.getElementById('btnVoltarOracao');
  if (btnVoltarOracao) {
    btnVoltarOracao.addEventListener('click', function() {
      // Reexibe a sidebar
      var sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.style.display = '';
      // Volta para a página inicial
      document.getElementById('oracaoPage').style.display = 'none';
      document.getElementById('inicioPage').style.display = 'block';
      // Marca o menu como ativo
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      var inicioItem = document.querySelector('.nav-item[data-page="inicio"]');
      if (inicioItem) inicioItem.classList.add('active');
    });
  }
});
// Variável global para rastrear o player ativo
let activePlaylistState = null;

// Dados das categorias
const categoriesData = {
  estudos: {
    icon: '📖',
    title: 'Estudos Bíblicos',
    desc: 'Estudos, cursos, devocionais e apostilas',
    files: [
      { name: 'Estudos Bíblicos: A Justificação e a Santificação', type: 'pdf', date: '2024-12-15', popularity: 97, tags: ['Justificação', 'Santificação', 'Graça'] },
      { name: 'Estudos Bíblicos: O Santuário Celestial', type: 'pdf', date: '2024-12-12', popularity: 94, tags: ['Santuário', 'Hebreus', 'Cristo'] },
      { name: 'Estudos Bíblicos: A Trindade', type: 'pdf', date: '2024-12-10', popularity: 96, tags: ['Trindade', 'Deus', 'Doutrina'] },
      { name: 'Estudos Bíblicos: O Significado do Sabá', type: 'pdf', date: '2024-12-08', popularity: 93, tags: ['Sábado', 'Mandamentos', 'Descanso'] },
      { name: 'Estudos Bíblicos: Profecias de Daniel e Apocalipse', type: 'pdf', date: '2024-12-05', popularity: 95, tags: ['Profecia', 'Daniel', 'Apocalipse'] },
      { name: 'Estudos Bíblicos: O Plano de Salvação', type: 'pdf', date: '2024-12-03', popularity: 98, tags: ['Salvação', 'Redenção', 'Evangelho'] },
      { name: 'Estudos Bíblicos: A Igreja e Seus Fundamentos', type: 'pdf', date: '2024-12-01', popularity: 91, tags: ['Igreja', 'Corpo de Cristo', 'Dons'] },
      { name: 'Estudo: Evangelho de João', type: 'pdf', date: '2024-11-02', popularity: 95, tags: ['Evangelho', 'Jesus', 'PDF'] },
      { name: 'Devocional Diário', type: 'pdf', date: '2024-12-10', popularity: 82, tags: ['Devocional', 'PDF'] },
      { name: 'Curso: Escatologia', type: 'pdf', date: '2024-08-20', popularity: 90, tags: ['Curso', 'Profecia', 'PDF'] },
      { name: 'Estudo: Livro de Daniel', type: 'pdf', date: '2024-09-05', popularity: 88, tags: ['Profecia', 'PDF'] },
      { name: 'Apostila da Escola Bíblica', type: 'pdf', date: '2024-07-15', popularity: 76, tags: ['Apostila', 'PDF'] },
      { name: 'PDF: Salmos Selecionados', type: 'pdf', date: '2024-10-01', popularity: 79, tags: ['Salmos', 'PDF'] }
    ]
  },
  audio: {
    title: 'Áudio',
    desc: 'Pregações, louvores e podcasts',
    files: [
      { name: 'Pregação: Salmo 23', type: 'audio', date: '2024-11-22', popularity: 91, tags: ['Pregação', 'Salmos'] },
      { name: 'Testemunho: Deus é Fiel', type: 'audio', date: '2024-12-01', popularity: 97, tags: ['Testemunho', 'Áudio'] },
      { name: 'Podcast: Fé em Ação', type: 'audio', date: '2024-10-18', popularity: 84, tags: ['Podcast', 'Fé'] },
      { name: 'Trilha Instrumental 01', type: 'audio', date: '2024-09-28', popularity: 72, tags: ['Instrumental'] }
    ]
  },
  musicas: {
    title: 'Músicas',
    desc: 'Louvores, cifras e playbacks organizados por artista',
    hasArtists: true,
    artists: [
      {
        name: 'Adoradores',
        photo: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Louvor e Adoração', 
            type: 'audio', 
            date: '2024-11-20', 
            popularity: 92, 
            tags: ['Louvor', 'Adoração', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Te Adorarei', duration: '4:25' },
              { title: 'Revolução do Amor', duration: '5:10' },
              { title: 'Deus de Aliança', duration: '4:48' },
              { title: 'Em Espírito e Verdade', duration: '5:02' },
              { title: 'Teu Amor', duration: '4:32' },
              { title: 'Só a Ele', duration: '4:15' },
              { title: 'O Meu Refúgio', duration: '5:20' },
              { title: 'Grande é o Senhor', duration: '4:55' },
              { title: 'Nosso Deus é Grande', duration: '5:15' },
              { title: 'Corações Rendidos', duration: '4:40' }
            ]
          },
          { name: 'Cifras - Adoradores', type: 'pdf', date: '2024-11-15', popularity: 88, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Aline Barros',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Graça', 
            type: 'audio', 
            date: '2024-09-30', 
            popularity: 89, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Graça', duration: '4:52' },
              { title: 'Ele é Santo', duration: '5:18' },
              { title: 'Basta Crer', duration: '4:25' },
              { title: 'Deus Enxerga Você', duration: '4:38' },
              { title: 'Deseja Meu Coração', duration: '5:02' },
              { title: 'A Vinda de Jesus', duration: '5:35' }
            ]
          },
          { name: 'Letras e Cifras', type: 'pdf', date: '2024-08-02', popularity: 85, tags: ['Letra', 'PDF'] }
        ]
      },
      {
        name: 'Ana Nóbrega',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Alfa e Ômega', 
            type: 'audio', 
            date: '2024-11-15', 
            popularity: 95, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Alfa e Ômega', duration: '4:32' },
              { title: 'Oceanos', duration: '5:18' },
              { title: 'Bondade de Deus', duration: '4:45' },
              { title: 'Só Quero Ver Você', duration: '3:52' },
              { title: 'Santo', duration: '5:02' },
              { title: 'Yeshua', duration: '4:28' },
              { title: 'Tua Graça Me Basta', duration: '4:15' }
            ]
          },
          { 
            name: 'Tetelestai', 
            type: 'audio', 
            date: '2024-08-20', 
            popularity: 88, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Tetelestai', duration: '4:58' },
              { title: 'Me Ama', duration: '3:42' },
              { title: 'Brilha Jesus', duration: '4:20' },
              { title: 'Adorarei', duration: '5:10' },
              { title: 'Tudo é Teu', duration: '3:55' }
            ]
          },
          { name: 'Cifras - Alfa e Ômega', type: 'pdf', date: '2024-11-10', popularity: 86, tags: ['Cifra', 'PDF'] },
          { name: 'Cifras - Tetelestai', type: 'pdf', date: '2024-08-15', popularity: 82, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'David Quinlan',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Viver em Cristo', 
            type: 'audio', 
            date: '2024-10-10', 
            popularity: 88, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Nada Pode Calar o Meu Louvor', duration: '5:18' },
              { title: 'Viver em Cristo', duration: '4:45' },
              { title: 'Nos Braços do Pai', duration: '5:00' },
              { title: 'Caminho de Vitória', duration: '4:52' },
              { title: 'Só Jesus', duration: '5:10' },
              { title: 'Grato Sou', duration: '4:38' }
            ]
          },
          { name: 'Cifras - David Quinlan', type: 'pdf', date: '2024-10-05', popularity: 84, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Diante do Trono',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Quero Me Apaixonar', 
            type: 'audio', 
            date: '2024-10-05', 
            popularity: 92, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Quero Me Apaixonar', duration: '4:25' },
              { title: 'Agnus Dei', duration: '5:12' },
              { title: 'A Ele a Glória', duration: '4:38' },
              { title: 'Manancial', duration: '3:58' },
              { title: 'Tua Palavra', duration: '4:42' },
              { title: 'Deus de Promessas', duration: '5:05' }
            ]
          },
          { 
            name: 'Tetelestai', 
            type: 'audio', 
            date: '2024-09-12', 
            popularity: 90, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Tetelestai', duration: '5:00' },
              { title: 'Creio em Ti', duration: '4:15' },
              { title: 'Preciso de Ti', duration: '4:48' },
              { title: 'Aos Pés da Cruz', duration: '5:22' }
            ]
          },
          { name: 'Cifras - Coletânea', type: 'pdf', date: '2024-07-20', popularity: 80, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Fernandinho',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Teus Sonhos', 
            type: 'audio', 
            date: '2024-12-01', 
            popularity: 94, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Teus Sonhos', duration: '4:42' },
              { title: 'Enquanto Houver Tempo', duration: '4:18' },
              { title: 'Comunhão', duration: '5:05' },
              { title: 'Você é Digno', duration: '4:30' },
              { title: 'Jesus Ressuscitado', duration: '4:55' },
              { title: 'Sua Glória Encherá a Terra', duration: '5:12' }
            ]
          },
          { 
            name: 'Playback - Coletânea', 
            type: 'audio', 
            date: '2024-11-30', 
            popularity: 86, 
            tags: ['Playback'], 
            cover: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Playback: Teus Sonhos', duration: '4:42' },
              { title: 'Playback: Enquanto Houver Tempo', duration: '4:18' },
              { title: 'Playback: Comunhão', duration: '5:05' },
              { title: 'Playback: Você é Digno', duration: '4:30' }
            ]
          },
          { name: 'Cifras - Teus Sonhos', type: 'pdf', date: '2024-11-28', popularity: 84, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Gabriela Rocha',
        photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Pra Onde Iremos?', 
            type: 'audio', 
            date: '2024-11-20', 
            popularity: 96, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Pra Onde Iremos?', duration: '5:10' },
              { title: 'Avança', duration: '4:28' },
              { title: 'Confiança', duration: '5:02' },
              { title: 'Só Você É Santo', duration: '4:35' },
              { title: 'Fidelidade', duration: '4:48' },
              { title: 'Infinitamente Mais', duration: '5:15' },
              { title: 'Teu Nome É Poderoso', duration: '4:42' }
            ]
          },
          { 
            name: 'Jesus em Tua Presença', 
            type: 'audio', 
            date: '2024-10-15', 
            popularity: 91, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Jesus em Tua Presença', duration: '5:22' },
              { title: 'Abra-se o Céu', duration: '4:55' },
              { title: 'Eu Confio', duration: '4:18' },
              { title: 'Tua Palavra', duration: '4:45' },
              { title: 'Graça Divina', duration: '5:08' }
            ]
          },
          { name: 'Cifras - Pra Onde Iremos?', type: 'pdf', date: '2024-11-18', popularity: 88, tags: ['Cifra', 'PDF'] },
          { name: 'Cifras - Jesus em Tua Presença', type: 'pdf', date: '2024-10-10', popularity: 85, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Grupo Vozes do Calvário',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Esperança e Fé', 
            type: 'audio', 
            date: '2024-09-25', 
            popularity: 91, 
            tags: ['Louvor', 'Esperança', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Grande é o Senhor', duration: '5:00' },
              { title: 'Eu Navegarei', duration: '4:48' },
              { title: 'Coração de Adorador', duration: '4:35' },
              { title: 'És Meu Refúgio', duration: '5:10' },
              { title: 'O Céu é Real', duration: '4:52' },
              { title: 'Deus de Promessas', duration: '5:20' },
              { title: 'O Senhor é o Meu Pastor', duration: '4:40' },
              { title: 'A Esperança é Viva', duration: '5:05' },
              { title: 'Vem, Senhor', duration: '4:28' },
              { title: 'Virá o Rei da Glória', duration: '5:15' },
              { title: 'Ele Voltará', duration: '4:58' },
              { title: 'Te Adoramos', duration: '4:45' },
              { title: 'Perto Quero Estar', duration: '5:02' }
            ]
          },
          { name: 'Cifras - Vozes do Calvário', type: 'pdf', date: '2024-09-20', popularity: 87, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Menos Um',
        photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Só Ele é Digno', 
            type: 'audio', 
            date: '2024-11-25', 
            popularity: 93, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Só Ele é Digno', duration: '4:52' },
              { title: 'Que Privilégio', duration: '5:10' },
              { title: 'Plenitude em Cristo', duration: '4:45' },
              { title: 'Confio em Ti', duration: '4:38' },
              { title: 'Força e Poder', duration: '5:02' },
              { title: 'Glória Eterna', duration: '4:55' }
            ]
          },
          { 
            name: 'Ao Senhor Nosso Deus', 
            type: 'audio', 
            date: '2024-10-20', 
            popularity: 91, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Ao Senhor Nosso Deus', duration: '5:12' },
              { title: 'Cântico de Vitória', duration: '4:48' },
              { title: 'Tudo ao Seu Controle', duration: '5:05' },
              { title: 'Graça Suficiente', duration: '4:32' },
              { title: 'Clamor do Coração', duration: '5:15' }
            ]
          },
          { name: 'Cifras - Menos Um', type: 'pdf', date: '2024-11-20', popularity: 87, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Ministério de Louvor IASD',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Promessa da Volta', 
            type: 'audio', 
            date: '2024-12-01', 
            popularity: 93, 
            tags: ['Louvor', 'Adventista', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Nosso Deus é Grande', duration: '5:08' },
              { title: 'Vem, Senhor Jesus', duration: '4:45' },
              { title: 'Te Amo, Senhor', duration: '4:32' },
              { title: 'Porque Ele Vive', duration: '5:15' },
              { title: 'À Espera de Ti', duration: '4:58' },
              { title: 'A Esperança', duration: '5:20' },
              { title: 'Venha ao Meu Encontro', duration: '4:40' },
              { title: 'Maranata', duration: '5:05' },
              { title: 'Vamos Para o Céu', duration: '4:48' },
              { title: 'Virá o Senhor', duration: '5:12' },
              { title: 'Quem Tem Esperança', duration: '4:35' },
              { title: 'A Volta de Jesus', duration: '5:25' },
              { title: 'Cristo Voltará', duration: '4:52' },
              { title: 'Aquele Que Vem', duration: '5:00' },
              { title: 'Estarei com Você', duration: '4:42' },
              { title: 'Amor que Liberta', duration: '5:10' },
              { title: 'Sou Teu', duration: '4:28' },
              { title: 'Obrigado, Senhor', duration: '4:55' },
              { title: 'Agradeço', duration: '5:02' }
            ]
          },
          { name: 'Cifras - Ministério de Louvor IASD', type: 'pdf', date: '2024-11-28', popularity: 89, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Plisma',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Som da Vida', 
            type: 'audio', 
            date: '2024-10-15', 
            popularity: 90, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Som da Vida', duration: '4:38' },
              { title: 'Canta a Minha Alma', duration: '5:12' },
              { title: 'Lágrimas de Gratidão', duration: '4:55' },
              { title: 'Deus Proverá', duration: '4:28' },
              { title: 'Meu Alvo é Cristo', duration: '5:05' },
              { title: 'Canta, Minha Alma', duration: '4:42' },
              { title: 'Vem, Espírito Santo', duration: '5:18' }
            ]
          },
          { name: 'Cifras - Plisma', type: 'pdf', date: '2024-10-10', popularity: 86, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Som e Louvor',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Gratidão e Reflexão', 
            type: 'audio', 
            date: '2024-11-05', 
            popularity: 90, 
            tags: ['Louvor', 'Gratidão', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Aos Pés da Cruz', duration: '5:12' },
              { title: 'Em Teus Braços', duration: '4:45' },
              { title: 'Santo Espírito', duration: '5:00' },
              { title: 'Eu Sou Teu', duration: '4:32' },
              { title: 'O Sol da Justiça', duration: '5:15' },
              { title: 'Deus Está Contigo', duration: '4:48' },
              { title: 'O Retorno do Rei', duration: '5:20' },
              { title: 'Dois Caminhos', duration: '4:38' },
              { title: 'É Tão Bom Esperar', duration: '5:05' },
              { title: 'Glorioso Dia', duration: '4:52' },
              { title: 'O Amor de Deus', duration: '5:10' },
              { title: 'Todo Poder', duration: '4:42' },
              { title: 'O Que Fazer', duration: '4:55' },
              { title: 'Pela Graça', duration: '5:02' },
              { title: 'Espírito Santo', duration: '4:35' }
            ]
          },
          { name: 'Cifras - Som e Louvor', type: 'pdf', date: '2024-11-01', popularity: 86, tags: ['Cifra', 'PDF'] }
        ]
      },
      {
        name: 'Thalles Roberto',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
        albums: [
          { 
            name: 'Uma História Diferente', 
            type: 'audio', 
            date: '2024-10-25', 
            popularity: 87, 
            tags: ['Louvor', 'Álbum'], 
            cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop',
            tracks: [
              { title: 'Uma História Diferente', duration: '5:12' },
              { title: 'Conhecer Você Mais', duration: '4:48' },
              { title: 'Propósito Divino', duration: '4:35' },
              { title: 'Sua Mercê', duration: '5:05' },
              { title: 'Inabalável', duration: '4:42' },
              { title: 'Transformação', duration: '5:18' },
              { title: 'Novo Amanhã', duration: '4:55' }
            ]
          },
          { name: 'Cifras - Uma História Diferente', type: 'pdf', date: '2024-10-20', popularity: 83, tags: ['Cifra', 'PDF'] }
        ]
      }
    ]
  },
  videos: {
    icon: '📺',
    title: 'Vídeos da Semana',
    desc: 'Cultos, testemunhos e clipes da semana atual',
    isWeekly: true,
    files: [
      { name: 'Culto: Domingo Especial', type: 'video', date: '2024-12-08', popularity: 89, tags: ['Culto', 'Vídeo'] },
      { name: 'Testemunho: Maria Silva', type: 'video', date: '2024-10-12', popularity: 83, tags: ['Testemunho', 'Vídeo'] },
      { name: 'Clipe: Deus Cuida de Mim', type: 'video', date: '2024-11-05', popularity: 94, tags: ['Clipe', 'Vídeo'] }
    ]
  },
  filmes: {
    title: 'Filmes Cristãos',
    desc: 'Longas para assistir em família e fortalecer a fé',
    files: [
      { name: 'Desafiando Gigantes', type: 'video', date: '2006-09-29', popularity: 95, cover: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=400&h=600&fit=crop', synopsis: 'Um treinador de futebol desafiador se vê forçado a lidar com questões de fé e confiança quando sua filha enfrenta uma doença séria.', tags: ['Filme', 'Fé', 'Esporte'] },
      { name: 'Deus Não Está Morto', type: 'video', date: '2014-03-21', popularity: 94, cover: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop', synopsis: 'Um jovem estudante universitário deve defender sua fé em sala de aula contra um professor ateu determinado a provar que Deus está morto.', tags: ['Filme', 'Universidade', 'Apologética'] },
      { name: 'Quarto de Guerra', type: 'video', date: '2015-08-28', popularity: 92, cover: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=400&h=600&fit=crop', synopsis: 'Um jovem casal descobre o poder da oração quando enfrentam uma série de ataques sobrenaturais em sua nova casa.', tags: ['Filme', 'Oração', 'Família'] },
      { name: 'À Prova de Fogo', type: 'video', date: '2008-09-26', popularity: 90, cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop', synopsis: 'Um casal de bombeiros enfrenta problemas no relacionamento, mas encontra esperança através da fé e do compromisso.', tags: ['Filme', 'Casamento', 'Superação'] },
      { name: 'Corajosos', type: 'video', date: '2011-09-30', popularity: 91, cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop', synopsis: 'Quatro policiais fazem um pacto para viver como cristãos autênticos, confiando em Deus em todos os aspectos de suas vidas.', tags: ['Filme', 'Família', 'Coragem'] },
      { name: 'A Cabana', type: 'video', date: '2017-03-03', popularity: 88, cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=600&fit=crop', synopsis: 'Um homem que sofre a perda trágica de sua filha é convidado para uma cabana na floresta onde enfrenta Deus e aprende sobre perdão.', tags: ['Filme', 'Perdão', 'Esperança'] },
      { name: 'Milagres do Paraíso', type: 'video', date: '2016-03-16', popularity: 89, cover: 'https://images.unsplash.com/photo-1451933335233-0d99e421b6e7?w=400&h=600&fit=crop', synopsis: 'A história real de um menino que sofre um acidente quase fatal e experimenta milagres através da fé de sua mãe.', tags: ['Filme', 'Milagre', 'Família'] },
      { name: 'O Céu é de Verdade', type: 'video', date: '2014-04-16', popularity: 87, cover: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=400&h=600&fit=crop', synopsis: 'A história verdadeira de um pastor cuja família experimenta uma visão celestial que muda suas perspectivas sobre fé e salvação.', tags: ['Filme', 'Testemunho', 'Fé'] },
      { name: 'A Paixão de Cristo', type: 'video', date: '2004-02-25', popularity: 96, cover: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop', synopsis: 'Uma representação dramática e comovente dos últimos dias de Jesus Cristo, desde sua crucificação até sua ressurreição.', tags: ['Filme', 'Jesus', 'Evangelhos'] }
    ]
  },
  infantil: {
    title: 'Infantil',
    desc: 'Histórias bíblicas e músicas para crianças',
    files: [
      { name: 'Álbum Infantil: O Senhor é o Meu Pastor', type: 'audio', date: '2025-03-22', popularity: 95, tags: ['Álbum', 'Infantil', 'Salmo 23'] },
      { name: 'Álbum Infantil: O Amor de Deus é Imenso', type: 'audio', date: '2025-02-15', popularity: 93, tags: ['Álbum', 'Infantil', 'Amor de Deus'] },
      { name: 'Vídeo Infantil: A História de Noé', type: 'video', date: '2025-01-10', popularity: 92, tags: ['Vídeo', 'Noé', 'Dilúvio'] },
      { name: 'Vídeo Infantil: Milagres de Jesus', type: 'video', date: '2024-12-20', popularity: 96, tags: ['Vídeo', 'Jesus', 'Milagres'] },
      { name: 'Álbum Infantil: Meu Deus é Forte', type: 'audio', date: '2024-12-03', popularity: 90, tags: ['Álbum', 'Infantil', 'Poder de Deus'] },
      { name: 'Vídeo Infantil: Daniel e os Leões', type: 'video', date: '2024-11-25', popularity: 89, tags: ['Vídeo', 'Daniel', 'Coragem'] },
      { name: 'Atividades: A Viagem de Paulo', type: 'pdf', date: '2024-11-12', popularity: 85, tags: ['Atividade', 'Paulo', 'Missões'] },
      { name: 'História: A Boa Samaritana', type: 'pdf', date: '2024-10-30', popularity: 88, tags: ['História', 'Parábola', 'Amor'] },
      { name: 'Vídeo Infantil: Davi e Golias - Animação', type: 'video', date: '2024-10-15', popularity: 94, tags: ['Vídeo', 'Davi', 'Fé'] },
      { name: 'História: Davi e Golias', type: 'pdf', date: '2024-09-01', popularity: 78, tags: ['História', 'Coragem', 'Fé'] },
      { name: 'Atividades: Arca de Noé', type: 'pdf', date: '2024-08-18', popularity: 74, tags: ['Atividade', 'Colorir', 'Noé'] },
      { name: 'Vídeo Infantil: O Bom Samaritano', type: 'video', date: '2024-08-05', popularity: 87, tags: ['Vídeo', 'Parábola', 'Bondade'] },
      { name: 'História: Daniel na Cova dos Leões', type: 'pdf', date: '2024-07-10', popularity: 82, tags: ['História', 'Daniel', 'Confiança'] },
      { name: 'Atividades: Os 10 Mandamentos para Crianças', type: 'pdf', date: '2024-06-25', popularity: 79, tags: ['Atividade', 'Mandamentos', 'Jogo'] },
      { name: 'História: Jesus e as Crianças', type: 'pdf', date: '2024-05-14', popularity: 86, tags: ['História', 'Jesus', 'Amor'] },
      { name: 'Atividades: A Criação do Mundo', type: 'pdf', date: '2024-04-08', popularity: 77, tags: ['Atividade', 'Criação', 'Colorir'] }
    ]
  },
  livros: {
    title: 'Livros',
    desc: 'Livros cristãos e literatura edificante',
    files: [
      { name: 'Livro: O Desejado de Todas as Nações', type: 'pdf', date: '2024-12-15', popularity: 98, tags: ['Livro', 'Jesus', 'Ellen White'] },
      { name: 'Livro: Caminho a Cristo', type: 'pdf', date: '2024-12-10', popularity: 97, tags: ['Livro', 'Salvação', 'Devocional'] },
      { name: 'Livro: O Grande Conflito', type: 'pdf', date: '2024-11-28', popularity: 96, tags: ['Livro', 'Profecia', 'História'] },
      { name: 'Livro: Patriarcas e Profetas', type: 'pdf', date: '2024-11-20', popularity: 94, tags: ['Livro', 'Antigo Testamento', 'História'] },
      { name: 'Livro: Atos dos Apóstolos', type: 'pdf', date: '2024-11-15', popularity: 93, tags: ['Livro', 'Igreja Primitiva', 'História'] },
      { name: 'Livro: O Maior Discurso de Cristo', type: 'pdf', date: '2024-10-30', popularity: 91, tags: ['Livro', 'Sermão do Monte', 'Ensinos'] },
      { name: 'Livro: Parábolas de Jesus', type: 'pdf', date: '2024-10-18', popularity: 90, tags: ['Livro', 'Parábolas', 'Ensinos'] },
      { name: 'Livro: Profetas e Reis', type: 'pdf', date: '2024-10-05', popularity: 89, tags: ['Livro', 'Reis de Israel', 'História'] },
      { name: 'Livro: A Ciência do Bom Viver', type: 'pdf', date: '2024-09-22', popularity: 88, tags: ['Livro', 'Saúde', 'Vida Cristã'] },
      { name: 'Livro: Eventos Finais', type: 'pdf', date: '2024-09-10', popularity: 92, tags: ['Livro', 'Profecia', 'Fim dos Tempos'] }
    ]
  },
  escola: {
    title: 'Escola Bíblica',
    desc: 'Material didático, planos e questionários',
    files: [
      { name: 'Escola Bíblica: O Livro de Gênesis', type: 'pdf', date: '2024-12-10', popularity: 95, tags: ['Gênesis', 'Criação', 'Redenção'] },
      { name: 'Escola Bíblica: A Vida de Jesus', type: 'pdf', date: '2024-12-08', popularity: 98, tags: ['Evangelhos', 'Jesus', 'Ministério'] },
      { name: 'Escola Bíblica: Os Dez Mandamentos', type: 'pdf', date: '2024-12-05', popularity: 92, tags: ['Lei', 'Mandamentos', 'Moral'] },
      { name: 'Escola Bíblica: A Profecia de Daniel', type: 'pdf', date: '2024-11-28', popularity: 89, tags: ['Daniel', 'Profecia', 'Santuário'] },
      { name: 'Escola Bíblica: O Apocalipse', type: 'pdf', date: '2024-11-20', popularity: 94, tags: ['Apocalipse', 'Segunda Vinda', 'Profecias'] },
      { name: 'Escola Bíblica: O Espírito Santo', type: 'pdf', date: '2024-11-15', popularity: 91, tags: ['Espírito Santo', 'Dons', 'Santificação'] },
      { name: 'Escola Bíblica: A Missão e Evangelismo', type: 'pdf', date: '2024-11-10', popularity: 88, tags: ['Missão', 'Evangelismo', 'Grande Comissão'] },
      { name: 'Apostila: Antigo Testamento', type: 'pdf', date: '2024-07-10', popularity: 88, tags: ['Apostila', 'PDF'] },
      { name: 'Plano de Aula: Parábolas', type: 'pdf', date: '2024-10-20', popularity: 82, tags: ['Plano', 'PDF'] },
      { name: 'Questionário: Novo Testamento', type: 'pdf', date: '2024-11-15', popularity: 79, tags: ['Questionário', 'PDF'] }
    ]
  },
  reflexoes: {
    icon: '<i class="fas fa-lightbulb"></i>',
    title: 'Reflexões',
    desc: 'Reflexões psicológicas e bíblicas para crescimento espiritual',
    isReflections: true,
    reflectionTopics: [
      {
        section: 'Propósito e Prioridades',
        icon: '<i class="fas fa-compass"></i>',
        topics: [
          {
            title: 'O que é importante para você?',
            question: 'Está vivendo de acordo com seus valores?',
            reflection: 'Reserve um momento para refletir sobre suas prioridades. Pense no que realmente move seu coração e se suas ações refletem esses valores.\n\nJeremias 29:11 - "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar"\n\nMartin Seligman (Psicologia Positiva) mostra que viver com propósito e significado é um dos cinco pilares do bem-estar humano. Pessoas com propósito claro têm maior longevidade e satisfação com a vida.'
          },
          {
            title: 'Decisões Alinhadas com Objetivos',
            question: 'Suas escolhas de hoje levam você para onde deseja estar?',
            reflection: 'Cada decisão que tomamos é um tijolo na construção do nosso futuro. Suas escolhas estão alinhadas com seus valores?\n\nProvérbios 3:5-6 - "Confie no Senhor de todo seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos seus caminhos"\n\nDaniel Kahneman demonstra que decisões conscientes (Sistema 2) são mais alinhadas com objetivos de longo prazo do que escolhas automáticas (Sistema 1).'
          }
        ]
      },
      {
        section: 'Relacionamentos',
        icon: '<i class="fas fa-heart"></i>',
        topics: [
          {
            title: 'Impacto das Relações',
            question: 'Como suas relações moldam quem você é?',
            reflection: 'Somos profundamente influenciados pelas pessoas com quem convivemos. Você está se tornando melhor através de seus relacionamentos?\n\n1 Coríntios 15:33 - "Não se deixem enganar: as más companhias corrompem os bons costumes". Provérbios 27:17 - "Como o ferro afia o ferro, assim um homem afia outro"\n\nNeurônios-espelho demonstram que absorvemos emoções e comportamentos de quem nos cerca. Harvard Study of Adult Development confirma que relacionamentos saudáveis são o maior preditor de felicidade.'
          },
          {
            title: 'Perdão e Reconciliação',
            question: 'Você está guardando ressentimentos ou é capaz de perdoar?',
            reflection: 'Guardar mágoa é como beber veneno esperando que o outro sofra. O perdão liberta SEU coração.\n\nMateus 18:22 - "Perdoe setenta vezes sete". Efésios 4:32 - "Sejam bondosos e compassivos uns com os outros, perdoando-se mutuamente"\n\nFred Luskin (Stanford Forgiveness Project) mostra que perdão reduz ansiedade, depressão e raiva. Guardar ressentimento aumenta cortisol e risco de doenças.'
          }
        ]
      },
      {
        section: 'Espiritualidade e Fé',
        icon: '<i class="fas fa-cross"></i>',
        topics: [
          {
            title: 'Conexão com a Fé',
            question: 'Como sua fé te guia em momentos difíceis?',
            reflection: 'Nos vales da vida nossa fé é testada e fortalecida. A verdadeira fé não nos livra das tempestades, mas nos sustenta através delas.\n\nTiago 1:2-4 - "Meus irmãos, considerem motivo de alegria o fato de passarem por diversas provações, pois vocês sabem que a prova da fé produz perseverança". Salmos 23:4\n\nPsicologia da Religião demonstra que fé oferece três recursos psicológicos: significado existencial, suporte social, e estratégias de enfrentamento eficazes (coping religioso positivo).'
          },
          {
            title: 'Práticas Espirituais',
            question: 'Como a oração influencia sua paz interior?',
            reflection: 'Em um mundo barulhento, a oração e meditação na Palavra são oásis de paz. Quando foi a última vez que aquietou sua alma diante de Deus?\n\nFilipenses 4:6-7 - "E a paz de Deus, que excede todo entendimento, guardará vossos corações e mentes em Cristo Jesus". Salmos 46:10 - "Aquietem-se e saibam que eu sou Deus"\n\nNeuroimagem (fMRI) mostra que meditação e oração alteram atividade cerebral, fortalecendo áreas ligadas à atenção, compaixão e regulação emocional. Herbert Benson documentou a "resposta de relaxamento".'
          }
        ]
      },
      {
        section: 'Gratidão',
        icon: '<i class="fas fa-hands-praying"></i>',
        topics: [
          {
            title: 'Reconhecimento do que é Bom',
            question: 'Pelo que você é grato na sua vida?',
            reflection: 'Gratidão transforma o que temos em suficiente. Pause agora e liste mentalmente cinco bênçãos em sua vida - não as óbvias, mas aquelas que dá por garantidas.\n\n1 Tessalonicenses 5:18 - "Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus". Salmos 103:2 - "Bendiga o Senhor, ó minha alma! Não esqueça nenhuma de suas bênçãos"\n\nRobert Emmons (UC Davis) demonstra que praticar gratidão aumenta bem-estar em 25%, melhora sono, reduz depressão e fortalece sistema imunológico. Gratidão reestrutura padrões neurais.'
          },
          {
            title: 'Expressar Gratidão',
            question: 'Como demonstrar mais gratidão pelos outros?',
            reflection: 'Sentir gratidão e não expressar é como embrulhar um presente e não entregar. Um simples "obrigado" pode ser o raio de sol no dia nublado de alguém.\n\nLucas 17:11-19 - História dos dez leprosos. Jesus perguntou: "Não foram purificados todos os dez? Onde estão os outros nove?" Colossenses 3:17 - "Tudo o que fizerem, façam-no em nome do Senhor Jesus, dando por meio dele graças a Deus Pai"\n\nExpressar gratidão fortalece relacionamentos e ativa circuitos de recompensa cerebral (dopamina). Sara Algoe demonstra que gratidão mútua aumenta bem-estar de ambos.'
          }
        ]
      }
    ]
  }
};

// Função para obter ícone Font Awesome baseado na categoria
function getIconForCategory(categoryKey) {
  const iconMap = {
    estudos: '<i class="fas fa-book-open"></i>',
    audio: '<i class="fas fa-headphones-alt"></i>',
    musicas: '<i class="fas fa-music"></i>',
    videos: '<i class="fas fa-play-circle"></i>',
    filmes: '<i class="fas fa-film"></i>',
    infantil: '<i class="fas fa-baby"></i>',
    livros: '<i class="fas fa-book"></i>',
    escola: '<i class="fas fa-graduation-cap"></i>',
    reflexoes: '<i class="fas fa-lightbulb"></i>'
  };
  return iconMap[categoryKey] || '<i class="fas fa-folder"></i>';
}

// Função para obter ícone Font Awesome baseado no tipo de arquivo
function getIconForFileType(fileType) {
  const iconMap = {
    pdf: '<i class="fas fa-file-pdf"></i>',
    audio: '<i class="fas fa-music"></i>',
    video: '<i class="fas fa-video"></i>'
  };
  return iconMap[fileType] || '<i class="fas fa-file"></i>';
}

// Função para obter ícone específico baseado no conteúdo
function getIconForContent(file) {
  const normalize = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const name = normalize(file.name);
  const tags = (file.tags || []).map(t => normalize(t));
  
  // Verificar por tags específicas primeiro
  if (tags.some(t => t.includes('testemunho'))) {
    return '<i class="fas fa-comments"></i>';
  }
  if (tags.some(t => t.includes('pregacao') || t.includes('pregação'))) {
    return '<i class="fas fa-microphone-alt"></i>';
  }
  if (tags.some(t => t.includes('podcast'))) {
    return '<i class="fas fa-podcast"></i>';
  }
  if (tags.some(t => t.includes('instrumental'))) {
    return '<i class="fas fa-guitar"></i>';
  }
  if (tags.some(t => t.includes('historia') || t.includes('história'))) {
    return '<i class="fas fa-book"></i>';
  }
  if (tags.some(t => t.includes('atividade'))) {
    return '<i class="fas fa-palette"></i>';
  }
  if (tags.some(t => t.includes('album') || t.includes('álbum'))) {
    return '<i class="fas fa-compact-disc"></i>';
  }
  
  // Verificar pelo nome se as tags não foram encontradas
  if (name.includes('testemunho')) {
    return '<i class="fas fa-comments"></i>';
  }
  if (name.includes('pregacao') || name.includes('pregação')) {
    return '<i class="fas fa-microphone-alt"></i>';
  }
  if (name.includes('podcast')) {
    return '<i class="fas fa-podcast"></i>';
  }
  if (name.includes('instrumental') || name.includes('trilha')) {
    return '<i class="fas fa-guitar"></i>';
  }
  if (name.includes('historia') || name.includes('história')) {
    return '<i class="fas fa-book"></i>';
  }
  if (name.includes('atividade')) {
    return '<i class="fas fa-palette"></i>';
  }
  if (name.includes('album') || name.includes('álbum')) {
    return '<i class="fas fa-compact-disc"></i>';
  }
  
  // Fallback para tipo genérico
  return getIconForFileType(file.type);
}

// Lista cifras (PDF) disponíveis na categoria de músicas
function getAvailableCifras(cat) {
  if (!cat || !cat.artists) return [];

  return cat.artists.flatMap(artist => {
    const albums = artist.albums || [];
    return albums
      .filter(album => album.type === 'pdf')
      .map(album => ({
        ...album,
        artistName: artist.name
      }));
  });
}

// ====== NEWS TICKER ======
// Função auxiliar para converter data brasileira em Date
function parseBrazilianDate(dateStr) {
  const months = {
    'Janeiro': 0, 'Fevereiro': 1, 'Março': 2, 'Abril': 3,
    'Maio': 4, 'Junho': 5, 'Julho': 6, 'Agosto': 7,
    'Setembro': 8, 'Outubro': 9, 'Novembro': 10, 'Dezembro': 11
  };
  
  const parts = dateStr.match(/(\d+) de (\w+) de (\d+)/);
  if (!parts) return new Date(0);
  
  const day = parseInt(parts[1]);
  const month = months[parts[2]];
  const year = parseInt(parts[3]);
  
  return new Date(year, month, day);
}

const newsData = {
  1: {
    icon: '📢',
    title: 'Conferência Mundial de Cristãos Acontece em Jerusalém',
    date: '16 de Janeiro de 2026',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    description: 'Milhares de cristãos de todo mundo se reúnem para celebrar fé e esperança.',
    content: `
      <p>Jerusalém sediou a maior Conferência Cristã Mundial do ano, reunindo mais de 50 mil fiéis de mais de 120 países.</p>
      <p>Durante cinco dias, líderes religiosos, teólogos e pastores compartilharam mensagens de esperança, reconciliação e missão cristã.</p>
      <p>A conferência destacou o compromisso da Igreja Global com a propagação do evangelho e o serviço aos necessitados.</p>
      <p>Diversos temas foram abordados: evangelização moderna, discipulado, missões e liderança cristã. Transmissões ao vivo atingiram mais de 5 milhões de visualizações.</p>
      <p><strong>A mensagem central: "Luz para o Mundo" - uma chamada para que os cristãos sejam testemunhas vivas de Cristo em suas comunidades.</strong></p>
    `
  },
  2: {
    icon: '🙏',
    title: 'Movimento de Missões Cristãs Alcança 1 Milhão de Vidas',
    date: '12 de Janeiro de 2026',
    image: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1200&h=800&fit=crop',
    description: 'Organizações cristãs transformam vidas em comunidades carentes da África e América Latina.',
    content: `
      <p>Um coletivo de missionários cristãos celebra o marco histórico de 1 milhão de vidas transformadas através de programas de educação, saúde e evangelização.</p>
      <p>Os programas incluem: construção de escolas cristãs, clínicas de saúde, programas de capacitação profissional e grupos de discipulado.</p>
      <p>Voluntários de mais de 80 países trabalham incansavelmente para levar esperança e o evangelho aos lugares mais remotos.</p>
      <p>Em 2026, o objetivo é expandir as missões para 15 novos países e impactar mais 500 mil pessoas com o amor de Cristo.</p>
      <p><strong>"A Grande Comissão continua: "Ide e fazei discípulos de todas as nações".</strong></p>
    `
  },
  3: {
    icon: '⛪',
    title: 'Novo Movimento Ecumênico Promove Unidade entre Igrejas',
    date: '8 de Janeiro de 2026',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&h=800&fit=crop',
    description: 'Denominações cristãs se unem em propósito comum de servir a Cristo e transformar sociedades.',
    content: `
      <p>Um novo movimento ecumênico reúne católicos, protestantes, ortodoxos e evangélicos em torno de uma visão compartilhada de unidade cristã.</p>
      <p>O movimento "Cristãos Unidos" foca em três pilares: proclamação do evangelho, diaconia (serviço) e busca pela paz e justiça social.</p>
      <p>Líderes de todas as tradições cristãs assinaram uma declaração conjunta comprometendo-se a trabalhar juntos nos campos educacional, social e espiritual.</p>
      <p>Iniciativas concretas já estão em andamento em 50 cidades, incluindo centros de acolhimento, programas de educação cristã e campanhas de solidariedade.</p>
      <p><strong>A mensagem é clara: "Para que todos sejam um" - promovendo a unidade que Cristo deseja para Sua Igreja.</strong></p>
    `
  },
  4: {
    icon: '✝️',
    title: 'Avivamento Espiritual Transforma Comunidades em Toda Ásia',
    date: '5 de Janeiro de 2026',
    image: 'https://images.unsplash.com/photo-1485809895578-42ce49bbb256?w=1200&h=800&fit=crop',
    description: 'Movimentos de renovação espiritual geram conversões em massa e transformação social.',
    content: `
      <p>Um avivamento espiritual sem precedentes está varredendo várias nações asiáticas, trazendo centenas de milhares ao arrependimento e fé em Cristo.</p>
      <p>Reuniões de oração, estudos bíblicos comunitários e campanhas evangelísticas mobilizam igrejas locais em uma manifestação visível do Espírito Santo.</p>
      <p>Relatos incluem mudanças transformadoras: famílias restauradas, vícios superados, lideranças comunitárias renascidas espiritualmente.</p>
      <p>Pastores e líderes creditam o avivamento ao interceder fervoroso, pregação fiel das Escrituras e abertura dos corações para o trabalho do Espírito.</p>
      <p><strong>Este movimento demonstra que a fé cristã permanece viva e poderosa para transformar vidas e nações.</strong></p>
    `
  },
  5: {
    icon: '🌍',
    title: 'Programa Global de Discipulado Cristão Atinge 10 Milhões de Pessoas',
    date: '1 de Janeiro de 2026',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=800&fit=crop',
    description: 'Iniciativa digital conecta cristãos em todo o mundo para crescimento espiritual e comunhão.',
    content: `
      <p>Uma plataforma digital revolucionária de discipulado cristão atingiu a marca de 10 milhões de usuários ativos em 190 países.</p>
      <p>A plataforma oferece: cursos bíblicos estruturados, grupos de oração online, mentorado espiritual e comunidades de pequenos grupos.</p>
      <p>Milhões de cristãos acessam diariamente recursos para aprofundar sua fé, crescer em santidade e compartilhar suas experiências com outros crentes.</p>
      <p>Estatísticas mostram impacto real: 85% reportam crescimento espiritual, 70% iniciaram ministérios locais, 60% fizeram compromissos missionários.</p>
      <p><strong>Este é um sinal dos tempos: a tecnologia a serviço do Reino de Deus, conectando o corpo de Cristo globalmente.</strong></p>
    `
  },
  6: {
    icon: '📚',
    title: 'Novo Testamento Traduzido para 500ª Língua Indígena',
    date: '20 de Dezembro de 2025',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=1200&h=800&fit=crop',
    description: 'Tradução Bíblica histórica torna Palavra de Deus acessível a comunidades remotas.',
    content: `
      <p>Organizações missionárias de tradução bíblica celebram um marco histórico: o Novo Testamento foi completamente traduzido para 500 línguas indígenas.</p>
      <p>Este esforço dedicado, envolvendo centenas de tradutores e pesquisadores, levou mais de 30 anos para ser realizado.</p>
      <p>Agora, cerca de 100 milhões de pessoas que falam apenas línguas indígenas podem ler a Palavra de Deus em seu próprio idioma.</p>
      <p>Especialistas apontam que ter a Bíblia na língua materna aumenta dramaticamente a compreensão e aplicação da Palavra de Deus.</p>
      <p><strong>"A Palavra de Deus não retorna vazia" - agora alcançando coração e mentes em suas próprias línguas.</strong></p>
    `
  },
  7: {
    icon: '💒',
    title: 'Igreja Cumpre Visão de Plantar 100 Novas Congregações',
    date: '15 de Dezembro de 2025',
    image: 'https://images.unsplash.com/photo-1460723067056-26dfd8afb60f?w=1200&h=800&fit=crop',
    description: 'Expansão missionária resulta em 100 novas igrejas plantadas em áreas de alcance gospel zero.',
    content: `
      <p>Uma grande denominação cristã comemorou o cumprimento da visão de plantar 100 novas congregações em comunidades que nunca tinham ouvido o evangelho.</p>
      <p>Com apenas 2 anos de execução, o programa superou expectativas, com novas igrejas sendo estabelecidas organicamente e crescendo rapidamente.</p>
      <p>Cada nova congregação funciona como um centro de transformação espiritual: grupos de oração, aulas bíblicas, programas sociais e ativismo missionário.</p>
      <p>Líderes relatam uma renovação da fé nos plantadores: muitos deixaram carreiras seculares para dedicar-se integralmente ao plantio de igrejas.</p>
      <p><strong>O resultado: mais de 50 mil novas conversões e centenas de comunidades transformadas pelo evangelho.</strong></p>
    `
  },
  8: {
    icon: '🎓',
    title: 'Seminário Bíblico Oferece Bolsas para Mil Líderes de Minorias',
    date: '10 de Dezembro de 2025',
    image: 'https://images.unsplash.com/photo-1427504494785-cdaa41e0a07f?w=1200&h=800&fit=crop',
    description: 'Iniciativa de equidade oferece formação teológica a líderes de comunidades desfavorecidas.',
    content: `
      <p>Uma instituição educacional cristã anunciou um programa ambicioso: oferecer bolsas de estudos integrais a mil líderes de minorias étnicas e econômicas.</p>
      <p>O programa "Liderança Transformadora" prepara futuros pastores, missionários e educadores cristãos que retornarão às suas comunidades.</p>
      <p>Currículos incluem: teologia bíblica, liderança comunitária, advocacy social, saúde mental cristã e recursos para plantio de igrejas.</p>
      <p>Candidatos são selecionados não apenas por qualificações acadêmicas, mas também por chamado vocacional e compromisso com sua comunidade.</p>
      <p><strong>Esta iniciativa investe em lideranças que transformarão suas nações para Cristo, começando pelas comunidades mais vulneráveis.</strong></p>
    `
  }
};

// Variáveis de controle do ticker
let currentNewsIndex = 0;
let newsInterval = null;

// Elementos do DOM
const newsTicker = document.getElementById('newsTicker');
const newsModal = document.getElementById('newsModal');
const closeNewsModal = document.getElementById('closeNewsModal');
const prevButton = document.querySelector('.news-ticker-control.prev');
const nextButton = document.querySelector('.news-ticker-control.next');

// Abrir modal de notícia
function openNewsModal(newsId) {
  const news = newsData[newsId];
  if (!news) return;
  
  document.getElementById('newsModalIcon').textContent = news.icon;
  document.getElementById('newsModalTitle').textContent = news.title;
  document.getElementById('newsModalDate').textContent = news.date;
  document.getElementById('newsModalBody').innerHTML = news.content;
  
  // Evitar que links dentro do modal redirecionem para outras páginas
  const modalBody = document.getElementById('newsModalBody');
  if (modalBody) {
    modalBody.addEventListener('click', function(e) {
      const anchor = e.target.closest('a');
      if (anchor) {
        e.preventDefault();
        e.stopPropagation();
        // Opcional: abrir links externos em nova aba
        const href = anchor.getAttribute('href');
        if (href && /^https?:\/\//.test(href)) {
          try { window.open(href, '_blank'); } catch (_) {}
        }
        // Links internos são ignorados para manter o conteúdo no modal
      }
    }, { once: true });
  }
  
  newsModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Fechar modal de notícia
function closeNewsModalFunc() {
  newsModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Event listeners para modal
if (closeNewsModal) {
  closeNewsModal.addEventListener('click', closeNewsModalFunc);
}

if (newsModal) {
  newsModal.addEventListener('click', function(e) {
    if (e.target === newsModal) {
      closeNewsModalFunc();
    }
  });
}

// Event listeners para cliques nas notícias
document.querySelectorAll('.news-item').forEach(item => {
  item.addEventListener('click', function() {
    const newsId = this.getAttribute('data-news-id');
    openNewsModal(newsId);
  });
});

// Navegação manual (prev/next)
if (prevButton) {
  prevButton.addEventListener('click', function() {
    const newIndex = currentTickerIndex - itemsPerPage;
    if (newIndex >= 0) {
      scrollToTickerCard(newIndex);
    }
  });
}

if (nextButton) {
  nextButton.addEventListener('click', function() {
    const newIndex = currentTickerIndex + itemsPerPage;
    if (newIndex < totalNewsItems) {
      scrollToTickerCard(newIndex);
    }
  });
}

// Função para rolar até uma notícia específica
function scrollToNews(index) {
  const newsItems = document.querySelectorAll('.ticker-card');
  if (newsItems[index]) {
    newsItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

// Auto-scroll das notícias (opcional - pode comentar se preferir apenas a animação CSS)
function startNewsAutoScroll() {
  newsInterval = setInterval(function() {
    const newsItems = document.querySelectorAll('.news-item');
    currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
    scrollToNews(currentNewsIndex);
  }, 5000); // Muda a cada 5 segundos
}

// Pausar auto-scroll ao passar o mouse
if (newsTicker) {
  newsTicker.addEventListener('mouseenter', function() {
    if (newsInterval) {
      clearInterval(newsInterval);
      newsInterval = null;
    }
  });
  
  newsTicker.addEventListener('mouseleave', function() {
    if (!newsInterval) {
      startNewsAutoScroll();
    }
  });
}

// Iniciar auto-scroll ao carregar a página
// startNewsAutoScroll(); // Descomente se quiser scroll automático além da animação CSS

// ====== NEWS CARDS (Página Notícias) ======
function renderNewsCards() {
  const scrollContainer = document.getElementById('newsCardsScroll');
  if (!scrollContainer) return;

  scrollContainer.innerHTML = '';
  const entries = Object.entries(newsData);
  
  // Duplicar items para criar efeito de loop infinito
  const allItems = [...entries, ...entries];

  allItems.forEach(([id, item]) => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.setAttribute('data-news-id', id);

    card.innerHTML = `
      <div class="news-card-image">
        <img src="${item.image}" alt="${item.title}">
        <div class="news-card-badge">${item.icon}</div>
      </div>
      <div class="news-card-content">
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-card-desc">${item.description}</p>
        <div class="news-card-meta">
          <span class="news-card-date"><i class="far fa-calendar"></i> ${item.date}</span>
          <button class="news-card-read">Ler mais</button>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openNewsModal(id));
    const readBtn = card.querySelector('.news-card-read');
    if (readBtn) readBtn.addEventListener('click', (e) => { e.stopPropagation(); openNewsModal(id); });

    scrollContainer.appendChild(card);
  });
}

// Renderizar cards do ticker na homepage
let currentTickerIndex = 0;
const totalNewsItems = 6; // Mostrar apenas 6 notícias
const totalDots = 2; // 2 pontos (cada um representa 3 notícias)
const itemsPerPage = 3; // 3 notícias por página

function renderTickerCards() {
  const ticker = document.getElementById('newsTicker');
  if (!ticker) return;

  ticker.innerHTML = '';
  
  // Converter e ordenar por data (mais recentes primeiro)
  const entries = Object.entries(newsData).sort((a, b) => {
    const dateA = parseBrazilianDate(a[1].date);
    const dateB = parseBrazilianDate(b[1].date);
    return dateB - dateA; // Ordem decrescente (mais recente primeiro)
  }).slice(0, totalNewsItems); // Apenas primeiras 6
  
  // Apenas uma cópia das notícias
  entries.forEach(([id, item]) => {
    const tickerCard = document.createElement('div');
    tickerCard.className = 'ticker-card';
    tickerCard.setAttribute('data-news-id', id);

    tickerCard.innerHTML = `
      <div class="ticker-card-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="ticker-card-text">
        <p class="ticker-card-title">${item.title}</p>
        <p class="ticker-card-date">${item.date}</p>
      </div>
    `;

    tickerCard.addEventListener('click', (e) => {
      // Navegar para a página de notícias abrindo a notícia selecionada
      e.preventDefault();
      e.stopPropagation();
      try {
        window.location.href = `noticias.html?news=${id}`;
      } catch (_) {}
    });
    ticker.appendChild(tickerCard);
  });
  
  // Gerar dots
  renderTickerDots();
  
  // Aplicar animação ao container
  // Calcular 1/3 do scrollWidth já que triplicamos o conteúdo
  ticker.style.setProperty('--half', (ticker.scrollWidth / 3) + 'px');
  // ticker.classList.add('scrolling'); // Desabilitado - mantém notícias estáticas
  
  // Atualizar dot inicial
  updateActiveDot();
}

// Renderizar dots de paginação
function renderTickerDots() {
  const dotsContainer = document.getElementById('newsTickerDots');
  if (!dotsContainer) return;
  
  dotsContainer.innerHTML = '';
  
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('button');
    dot.className = 'ticker-dot';
    dot.setAttribute('data-index', i);
    dot.addEventListener('click', () => scrollToTickerCard(i * itemsPerPage));
    dotsContainer.appendChild(dot);
  }
}

// Atualizar dot ativo
function updateActiveDot() {
  const dots = document.querySelectorAll('.ticker-dot');
  const activeDotIndex = Math.floor(currentTickerIndex / itemsPerPage);
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeDotIndex);
  });
}

// Rolar para card específico
function scrollToTickerCard(index) {
  const ticker = document.getElementById('newsTicker');
  const cards = ticker.querySelectorAll('.ticker-card');
  
  if (cards[index]) {
    currentTickerIndex = index;
    // Usar scroll programático em vez de scrollIntoView para evitar mostrar scrollbar
    const cardWidth = 280 + 15; // largura do card + gap
    ticker.scrollLeft = index * cardWidth;
    updateActiveDot();
  }
}

// Bloqueio defensivo: impedir que qualquer link dentro do ticker navegue
const newsTickerContainer = document.getElementById('newsTicker');
if (newsTickerContainer) {
  newsTickerContainer.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor) {
      e.preventDefault();
      e.stopPropagation();
      // Opcional: abrir externos em nova aba
      const href = anchor.getAttribute('href');
      if (href && /^https?:\/\//.test(href)) {
        try { window.open(href, '_blank'); } catch (_) {}
      }
    }
  });
}

// Renderizar ao carregar
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    renderNewsCards();
    renderTickerCards();
    
    // Verificar se há parâmetro de página na URL
    const urlParams = new URLSearchParams(window.location.search);
    const targetPage = urlParams.get('page');
    
    // Se houver parâmetro, navegar para essa página
    if (targetPage) {
      const navItem = document.querySelector(`.nav-item[data-page="${targetPage}"]`);
      if (navItem) {
        navItem.click();
      }
    } else {
      // Caso contrário, inicializar com "Início"
      const inicioItem = document.querySelector('.nav-item[data-page="inicio"]');
      if (inicioItem) {
        inicioItem.click();
      }
    }
  }, 100);
});

// Função para renderizar detalhe da categoria
function renderLibraryDetail(key) {
  const cat = categoriesData[key];
  if (!cat) return;

  // Ao mudar de categoria, esconda o player de vídeo inline e pause
  if (typeof resetVideoPlayer === 'function') {
    resetVideoPlayer();
  }

  const grid = document.querySelector('.category-grid');
  const detail = document.getElementById('libraryDetail');
  if (!grid || !detail) return;

  // Se for categoria de música, renderizar lista de artistas
  if (cat.hasArtists) {
    renderArtistsList(key, cat, grid, detail);
    return;
  }

  // Se for categoria de reflexões, renderizar reflexões
  if (cat.isReflections) {
    renderReflections(key, cat, grid, detail);
    return;
  }

  const state = {
    search: '',
    type: 'all',
    sort: 'recent'
  };

  const renderList = () => {
    const normalizedSearch = state.search.trim().toLowerCase();
    const filtered = cat.files
      .filter(file => state.type === 'all' ? true : file.type === state.type)
      .filter(file => normalizedSearch === '' ? true : file.name.toLowerCase().includes(normalizedSearch) || (file.tags || []).some(t => t.toLowerCase().includes(normalizedSearch)));

    const sorted = filtered.sort((a, b) => {
      if (state.sort === 'recent') return new Date(b.date) - new Date(a.date);
      if (state.sort === 'popular') return b.popularity - a.popularity;
      if (state.sort === 'az') return a.name.localeCompare(b.name);
      return 0;
    });

    // Filmes exibem capa ao invés do ícone padrão
    if (key === 'filmes') {
      return sorted.map(file => {
        const cover = file.cover || 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=400&h=600&fit=crop';
        return `
          <div class="file-item film-item" data-video-src="${file.src || ''}" data-cover="${cover}" data-synopsis="${file.synopsis || ''}" data-popularity="${file.popularity || 0}">
            <div class="film-cover"><img src="${cover}" alt="Capa do filme ${file.name}"></div>
            <div class="file-body">
              <div class="file-name">${file.name}</div>
              <div class="file-meta">
                <span class="pill pill-type">${file.type.toUpperCase()}</span>
                <span class="pill pill-date">${file.date}</span>
                <span class="pill pill-pop">★ ${file.popularity}</span>
                ${(file.tags || []).map(tag => `<span class="pill">${tag}</span>`).join(' ')}
              </div>
            </div>
            <button class="download-btn ${file.type === 'audio' || file.type === 'video' ? 'play' : ''}" data-type="${file.type}"><span>${file.type === 'audio' || file.type === 'video' ? '▶' : '⬇'}</span></button>
          </div>
        `;
      }).join('');
    }

    return sorted.map(file => `
      <div class="file-item">
        <span class="file-icon file-icon-detail" data-type="${file.type}">${getIconForContent(file)}</span>
        <div class="file-body">
          <div class="file-name">${file.name}</div>
          <div class="file-meta">
            <span class="pill pill-type">${file.type.toUpperCase()}</span>
            <span class="pill pill-date">${file.date}</span>
            <span class="pill pill-pop">★ ${file.popularity}</span>
            ${(file.tags || []).map(tag => `<span class="pill">${tag}</span>`).join(' ')}
          </div>
        </div>
        <button class="download-btn ${file.type === 'audio' || file.type === 'video' ? 'play' : ''}" data-type="${file.type}"><span>${file.type === 'audio' || file.type === 'video' ? '▶' : '⬇'}</span></button>
      </div>
    `).join('');
  };

  const buildDetail = () => {
    detail.innerHTML = `
      <button class="back-btn" id="backToGrid">← Voltar</button>
      <div class="detail-header">
        <span class="category-icon">${getIconForCategory(key)}</span>
        <h3 class="detail-title">${cat.title}</h3>
      </div>
      <p class="detail-desc">${cat.desc}</p>

      <div class="catalog-controls">
        <div class="control-group">
          <label for="searchInput"><i class="fas fa-search"></i> Busca</label>
          <input id="searchInput" type="search" placeholder="Buscar por título ou tema" value="${state.search}">
        </div>
        <div class="control-group">
          <label for="sortSelect"><i class="fas fa-sort"></i> Ordenação</label>
          <select id="sortSelect">
            <option value="recent" ${state.sort === 'recent' ? 'selected' : ''}>Mais recentes</option>
            <option value="popular" ${state.sort === 'popular' ? 'selected' : ''}>Mais populares</option>
            <option value="az" ${state.sort === 'az' ? 'selected' : ''}>A → Z</option>
          </select>
        </div>
      </div>

      <div class="files-grid" id="filesGrid">
        ${renderList()}
      </div>
    `;

    const backBtn = document.getElementById('backToGrid');
    if (backBtn) {
      backBtn.onclick = () => {
        detail.style.display = 'none';
        detail.innerHTML = '';
        grid.style.display = 'grid';
        if (typeof resetVideoPlayer === 'function') {
          resetVideoPlayer();
        }
      };
    }

    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const sortSelect = document.getElementById('sortSelect');
    const filesGrid = document.getElementById('filesGrid');

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        state.search = searchInput.value;
        if (filesGrid) filesGrid.innerHTML = renderList();
      });
    }

    if (typeFilter) {
      typeFilter.addEventListener('change', () => {
        state.type = typeFilter.value;
        if (filesGrid) filesGrid.innerHTML = renderList();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        state.sort = sortSelect.value;
        if (filesGrid) filesGrid.innerHTML = renderList();
      });
    }
  };

  grid.style.display = 'none';
  detail.style.display = 'block';
  buildDetail();
}

// Renderizar lista de artistas (para categoria de Músicas)
function renderArtistsList(key, cat, grid, detail) {
  const cifraList = getAvailableCifras(cat);

  detail.innerHTML = `
    <button class="back-btn" id="backToGrid">← Voltar</button>
    <div class="detail-header">
      <span class="category-icon">${getIconForCategory(key)}</span>
      <h3 class="detail-title">${cat.title}</h3>
    </div>
    <p class="detail-desc">${cat.desc}</p>

    ${cifraList.length ? `
      <div class="cifra-trigger">
        <button class="cifra-btn" id="openCifras"><i class="fas fa-music"></i> Ver cifras (${cifraList.length})</button>
      </div>
      <div class="cifra-modal" id="cifraModal" style="display: none;">
        <div class="cifra-modal-backdrop" id="cifraModalBackdrop"></div>
        <div class="cifra-modal-content">
          <div class="cifra-modal-header">
            <div>
              <h4>Cifras disponíveis</h4>
              <p>Nem todas as músicas possuem cifra. Estas já estão prontas para baixar.</p>
            </div>
            <button class="cifra-close" id="closeCifras">✕</button>
          </div>
          <div class="cifra-modal-list">
            ${cifraList.map(cifra => `
              <div class="cifra-row">
                <div class="cifra-row-icon"><i class="fas fa-file-pdf"></i></div>
                <div class="cifra-row-body">
                  <div class="cifra-row-name">${cifra.name}</div>
                  <div class="cifra-row-meta">Artista: ${cifra.artistName} · Tipo: ${cifra.type.toUpperCase()}</div>
                </div>
                <button class="download-btn" data-type="pdf"><span>⬇</span></button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    ` : ''}
    
    <div class="artists-list">
      ${cat.artists.map((artist, idx) => `
        <div class="artist-item" data-artist-idx="${idx}">
          <img src="${artist.photo}" alt="${artist.name}" class="artist-photo">
          <span class="artist-name">${artist.name}</span>
          <span class="artist-arrow">→</span>
        </div>
      `).join('')}
    </div>
  `;

  grid.style.display = 'none';
  detail.style.display = 'block';

  const backBtn = document.getElementById('backToGrid');
  if (backBtn) {
    backBtn.onclick = () => {
      detail.style.display = 'none';
      detail.innerHTML = '';
      grid.style.display = 'grid';
    };
  }

  const openCifrasBtn = document.getElementById('openCifras');
  const cifraModal = document.getElementById('cifraModal');
  const closeCifrasBtn = document.getElementById('closeCifras');
  const cifraBackdrop = document.getElementById('cifraModalBackdrop');

  const closeCifras = () => {
    if (cifraModal) cifraModal.style.display = 'none';
  };

  if (openCifrasBtn && cifraModal) {
    openCifrasBtn.onclick = () => {
      cifraModal.style.display = 'flex';
    };
  }

  if (closeCifrasBtn) closeCifrasBtn.onclick = closeCifras;
  if (cifraBackdrop) cifraBackdrop.onclick = closeCifras;

  document.querySelectorAll('.artist-item').forEach(item => {
    item.addEventListener('click', () => {
      const artistIdx = parseInt(item.dataset.artistIdx);
      const artist = cat.artists[artistIdx];
      renderArtistAlbums(key, cat, artist, grid, detail);
    });
  });
}

// Renderizar álbuns de um artista específico
function renderArtistAlbums(key, cat, artist, grid, detail) {
  const state = {
    search: '',
    type: 'all',
    sort: 'recent'
  };

  const renderList = () => {
    const normalizedSearch = state.search.trim().toLowerCase();
    const filtered = artist.albums
      .filter(album => state.type === 'all' ? true : album.type === state.type)
      .filter(album => normalizedSearch === '' ? true : album.name.toLowerCase().includes(normalizedSearch) || (album.tags || []).some(t => t.toLowerCase().includes(normalizedSearch)));

    const sorted = filtered.sort((a, b) => {
      if (state.sort === 'recent') return new Date(b.date) - new Date(a.date);
      if (state.sort === 'popular') return b.popularity - a.popularity;
      if (state.sort === 'az') return a.name.localeCompare(b.name);
      return 0;
    });

    return sorted.map((album, idx) => {
      // Encontrar o índice original do álbum no array completo do artista
      const originalIdx = artist.albums.findIndex(a => a.name === album.name && a.date === album.date);
      return `
        <div class="file-item album-item" data-album-idx="${idx}" data-original-idx="${originalIdx}" data-has-tracks="${album.tracks ? 'true' : 'false'}">
          ${album.cover ? `<img src="${album.cover}" alt="${album.name}" class="album-cover">` : `<span class="file-icon file-icon-detail" data-type="${album.type}">${getIconForContent(album)}</span>`}
          <div class="file-body">
            <div class="file-name">${album.name}</div>
            <div class="file-meta">
              <span class="pill pill-type">${album.type.toUpperCase()}</span>
              <span class="pill pill-date">${album.date}</span>
              <span class="pill pill-pop">★ ${album.popularity}</span>
              ${(album.tags || []).map(tag => `<span class="pill">${tag}</span>`).join(' ')}
              ${album.tracks ? `<span class="pill pill-tracks">${album.tracks.length} faixas</span>` : ''}
            </div>
          </div>
          ${album.type === 'pdf' ? `<button class="download-btn" data-type="${album.type}"><span>⬇</span></button>` : ''}
        </div>
      `;
    }).join('');
  };

  const buildDetail = () => {
    detail.innerHTML = `
      <button class="back-btn" id="backToArtists">← Voltar aos Artistas</button>
      <div class="detail-header">
        <img src="${artist.photo}" alt="${artist.name}" class="artist-header-photo">
        <h3 class="detail-title">${artist.name}</h3>
      </div>
      <p class="detail-desc">Álbuns e materiais de ${artist.name}</p>

      <div class="catalog-controls">
        <div class="control-group">
          <label for="searchInput"><i class="fas fa-search"></i> Busca</label>
          <input id="searchInput" type="search" placeholder="Buscar por título ou tema" value="${state.search}">
        </div>
        <div class="control-group">
          <label for="sortSelect"><i class="fas fa-sort"></i> Ordenação</label>
          <select id="sortSelect">
            <option value="recent" ${state.sort === 'recent' ? 'selected' : ''}>Mais recentes</option>
            <option value="popular" ${state.sort === 'popular' ? 'selected' : ''}>Mais populares</option>
            <option value="az" ${state.sort === 'az' ? 'selected' : ''}>A → Z</option>
          </select>
        </div>
      </div>

      <div class="files-grid" id="filesGrid">
        ${renderList()}
      </div>
    `;

    const backBtn = document.getElementById('backToArtists');
    if (backBtn) {
      backBtn.onclick = () => {
        renderArtistsList(key, cat, grid, detail);
      };
    }

    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const sortSelect = document.getElementById('sortSelect');
    const filesGrid = document.getElementById('filesGrid');

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        state.search = searchInput.value;
        if (filesGrid) filesGrid.innerHTML = renderList();
        attachAlbumClickListeners();
      });
    }

    if (typeFilter) {
      typeFilter.addEventListener('change', () => {
        state.type = typeFilter.value;
        if (filesGrid) filesGrid.innerHTML = renderList();
        attachAlbumClickListeners();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        state.sort = sortSelect.value;
        if (filesGrid) filesGrid.innerHTML = renderList();
        attachAlbumClickListeners();
      });
    }

    // Adicionar evento de clique nos álbuns com tracks
    const attachAlbumClickListeners = () => {
      document.querySelectorAll('.album-item[data-has-tracks="true"]').forEach(albumEl => {
        albumEl.style.cursor = 'pointer';
        
        albumEl.addEventListener('click', (e) => {
          // Não abrir se clicou no botão de download
          if (e.target.closest('.download-btn')) {
            return;
          }
          
          // Usar o índice original do array completo do artista
          const originalIdx = parseInt(albumEl.dataset.originalIdx);
          const album = artist.albums[originalIdx];
          if (album && album.tracks) {
            openPlaylist(album, artist);
          }
        });
      });
    };

    attachAlbumClickListeners();
  };

  // Função para abrir playlist
  const openPlaylist = (album, artist) => {
    // Parar o player anterior se existir
    if (activePlaylistState) {
      activePlaylistState.isPlaying = false;
      activePlaylistState.currentTrackIdx = null;
    }
    
    // Fechar qualquer playlist aberta anteriormente
    const existingOverlay = document.getElementById('playlistOverlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
    
    const playlistHTML = `
      <div class="playlist-overlay" id="playlistOverlay">
        <div class="playlist-container">
          <button class="playlist-close" id="closePlaylist">✕</button>
          
          <div class="playlist-header-modern">
            <div class="playlist-cover-container">
              <img src="${album.cover}" alt="${album.name}" class="playlist-cover-modern">
              <div class="playlist-cover-overlay"></div>
            </div>
            <h2 class="playlist-title-modern">${album.name}</h2>
            <p class="playlist-artist-modern">${artist.name}</p>
            <p class="playlist-meta-modern"><i class="fas fa-music"></i> ${album.tracks.length} faixas · ${album.date}</p>
          </div>
          
          <div class="playlist-player-controls">
            <button class="playlist-player-btn" id="prevTrackBtn"><i class="fas fa-step-backward"></i></button>
            <button class="playlist-player-btn playlist-play-main" id="playPauseMainBtn"><i class="fas fa-play"></i></button>
            <button class="playlist-player-btn" id="nextTrackBtn"><i class="fas fa-step-forward"></i></button>
            <div class="playlist-volume-control">
              <button class="playlist-volume-btn" id="volumeToggleBtn"><i class="fas fa-volume-up"></i></button>
              <input type="range" class="playlist-volume-slider" id="playlistVolumeSlider" min="0" max="100" value="70">
              <span class="playlist-volume-value" id="volumeValue">70%</span>
            </div>
          </div>
          
          <div class="playlist-tracks-modern">
            ${album.tracks.map((track, idx) => `
              <div class="playlist-track-modern" data-track-idx="${idx}">
                <div class="track-left">
                  <span class="track-number-modern">${String(idx + 1).padStart(2, '0')}</span>
                  <button class="track-play-btn-modern"><i class="fas fa-play"></i></button>
                </div>
                <div class="track-info-modern">
                  <div class="track-title-modern">${track.title}</div>
                  <div class="track-artist-modern">${artist.name}</div>
                </div>
                <span class="track-duration-modern">${track.duration}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', playlistHTML);

    const overlay = document.getElementById('playlistOverlay');
    const closeBtn = document.getElementById('closePlaylist');
    const playPauseMainBtn = document.getElementById('playPauseMainBtn');
    const prevTrackBtn = document.getElementById('prevTrackBtn');
    const nextTrackBtn = document.getElementById('nextTrackBtn');
    const volumeToggleBtn = document.getElementById('volumeToggleBtn');
    const volumeSlider = document.getElementById('playlistVolumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    
    let currentTrackIdx = null;
    let isPlaying = false;
    let isMuted = false;
    
    // Registrar este player como o ativo
    activePlaylistState = { currentTrackIdx, isPlaying };

    const closePlaylist = () => {
      // Parar o player ao fechar
      isPlaying = false;
      currentTrackIdx = null;
      activePlaylistState = null;
      overlay.remove();
    };

    // Função para atualizar UI do player
    const updatePlayerUI = () => {
      document.querySelectorAll('.playlist-track-modern').forEach((el, idx) => {
        const playBtn = el.querySelector('.track-play-btn-modern');
        if (idx === currentTrackIdx) {
          el.classList.add('playing');
          playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
          el.classList.remove('playing');
          playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
      });
      
      if (playPauseMainBtn) {
        playPauseMainBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
      }
    };
    
    // Função para tocar uma faixa
    const playTrack = (idx) => {
      currentTrackIdx = idx;
      isPlaying = true;
      updatePlayerUI();
    };
    
    // Função para pausar
    const pauseTrack = () => {
      isPlaying = false;
      updatePlayerUI();
    };

    // Evento de clique nas faixas
    document.querySelectorAll('.playlist-track-modern').forEach((trackEl, idx) => {
      const playBtn = trackEl.querySelector('.track-play-btn-modern');
      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (currentTrackIdx === idx && isPlaying) {
            pauseTrack();
          } else {
            playTrack(idx);
          }
        });
      }
      
      trackEl.addEventListener('click', () => {
        if (currentTrackIdx === idx && isPlaying) {
          pauseTrack();
        } else {
          playTrack(idx);
        }
      });
    });
    
    // Botão play/pause principal
    if (playPauseMainBtn) {
      playPauseMainBtn.addEventListener('click', () => {
        if (currentTrackIdx === null) {
          playTrack(0);
        } else {
          if (isPlaying) {
            pauseTrack();
          } else {
            isPlaying = true;
            updatePlayerUI();
          }
        }
      });
    }
    
    // Botão faixa anterior
    if (prevTrackBtn) {
      prevTrackBtn.addEventListener('click', () => {
        if (currentTrackIdx !== null) {
          const newIdx = currentTrackIdx > 0 ? currentTrackIdx - 1 : album.tracks.length - 1;
          playTrack(newIdx);
        }
      });
    }
    
    // Botão próxima faixa
    if (nextTrackBtn) {
      nextTrackBtn.addEventListener('click', () => {
        if (currentTrackIdx !== null) {
          const newIdx = (currentTrackIdx + 1) % album.tracks.length;
          playTrack(newIdx);
        } else {
          playTrack(0);
        }
      });
    }
    
    // Controle de volume
    if (volumeToggleBtn) {
      volumeToggleBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        volumeToggleBtn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        volumeToggleBtn.classList.toggle('muted', isMuted);
      });
    }
    
    if (volumeSlider && volumeValue) {
      volumeSlider.addEventListener('input', (e) => {
        const vol = e.target.value;
        volumeValue.textContent = vol + '%';
        if (vol == 0) {
          volumeToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
          volumeToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
          isMuted = false;
        }
      });
    }

    closeBtn.addEventListener('click', closePlaylist);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePlaylist();
    });
  };

  buildDetail();
}

// Renderizar reflexões
function renderReflections(key, cat, grid, detail) {
  const state = {
    selectedSection: null,
    expandedTopic: null
  };

  const buildDetail = () => {
    const sections = cat.reflectionTopics || [];
    
    detail.innerHTML = `
      <button class="back-btn" id="backToGrid">← Voltar</button>
      <div class="detail-header">
        <span class="category-icon">${getIconForCategory(key)}</span>
        <h3 class="detail-title">${cat.title}</h3>
      </div>
      <p class="detail-desc">${cat.desc}</p>

      <div class="reflection-sections">
        ${sections.map((section, idx) => `
          <div class="reflection-section" data-section-idx="${idx}">
            <div class="section-header">
              <span class="section-icon">${section.icon}</span>
              <h3 class="section-title">${section.section}</h3>
            </div>
            
            <div class="section-topics">
              ${section.topics.map((topic, topicIdx) => `
                <div class="reflection-card" data-section-idx="${idx}" data-topic-idx="${topicIdx}">
                  <div class="reflection-card-header">
                    <h4>${topic.title}</h4>
                  </div>
                  <div class="reflection-card-question">${topic.question}</div>
                  <button class="reflection-toggle-btn">Ler reflexão</button>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const backBtn = document.getElementById('backToGrid');
    if (backBtn) {
      backBtn.onclick = () => {
        detail.style.display = 'none';
        detail.innerHTML = '';
        grid.style.display = 'grid';
      };
    }

    // Adicionar eventos aos botões de reflexão
    document.querySelectorAll('.reflection-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = btn.closest('.reflection-card');
        const sectionIdx = parseInt(card.dataset.sectionIdx);
        const topicIdx = parseInt(card.dataset.topicIdx);
        const topic = cat.reflectionTopics[sectionIdx].topics[topicIdx];
        
        // Abrir modal com a reflexão
        openReflectionModal(topic);
      });
    });
  };

  // Função para abrir modal de reflexão (popup)
  function openReflectionModal(topic) {
    // Remover modal anterior se existir
    const existingModal = document.getElementById('reflectionModal');
    if (existingModal) {
      existingModal.remove();
    }

    const modalHTML = `
      <div class="reflection-modal" id="reflectionModal">
        <div class="reflection-modal-overlay"></div>
        <div class="reflection-modal-content">
          <button class="reflection-modal-close" id="closeReflectionModal">✕</button>
          <h2 class="reflection-modal-title">${topic.title}</h2>
          <div class="reflection-modal-question">${topic.question}</div>
          <div class="reflection-modal-text">${topic.reflection.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('reflectionModal');
    const closeBtn = document.getElementById('closeReflectionModal');
    const overlay = modal.querySelector('.reflection-modal-overlay');

    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Fechar com ESC
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });

    // Animação de entrada
    setTimeout(() => modal.style.opacity = '1', 10);
  }

  buildDetail();
  grid.style.display = 'none';
  detail.style.display = 'block';
}

// Função para adicionar novo vídeo à seção "Vídeos da Semana"
function addWeeklyVideo(videoData) {
  const videoCat = categoriesData.videos;
  if (videoCat && videoCat.isWeekly) {
    videoCat.files.unshift(videoData);
    console.log('Novo vídeo adicionado:', videoData.name);
  }
}

// Função para remover vídeo da seção "Vídeos da Semana"
function removeWeeklyVideo(videoName) {
  const videoCat = categoriesData.videos;
  if (videoCat && videoCat.isWeekly) {
    const index = videoCat.files.findIndex(v => v.name === videoName);
    if (index > -1) {
      videoCat.files.splice(index, 1);
      console.log('Vídeo removido:', videoName);
    }
  }
}

// Exemplo de uso:
// addWeeklyVideo({
//   icon: '🎥',
//   name: 'Novo Vídeo: Título',
//   type: 'video',
//   date: '2024-12-15',
//   popularity: 100,
//   tags: ['Novo', 'Vídeo']
// });

// ==================== FIM GERENCIAMENTO VÍDEOS ====================

// Navegação entre páginas
let lastPageChange = 0;
document.querySelectorAll('.nav-item[data-page]:not([data-page="debates"]):not([data-page="noticias"])').forEach(item => {
  item.addEventListener('click', (e) => {
    const page = e.currentTarget.dataset.page;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Prevenir múltiplos cliques em rápida sucessão
    const now = Date.now();
    if (now - lastPageChange < 300) return;
    lastPageChange = now;
    
    // Remover classe active de todos
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    // Esconder todas as páginas
    document.getElementById('inicioPage').style.display = 'none';
    document.getElementById('radioPage').style.display = 'none';
    document.getElementById('cultoPage').style.display = 'none';
    document.getElementById('oracaoPage').style.display = 'none';
    document.getElementById('bibliotecaPage').style.display = 'none';

    if (typeof resetVideoPlayer === 'function') {
      resetVideoPlayer();
    }
    // Fechar/limpar possíveis overlays/modais que possam bloquear cliques
    const playlistOverlay = document.getElementById('playlistOverlay');
    if (playlistOverlay) {
      try { playlistOverlay.remove(); } catch (_) {}
    }
    const musicPlayerModal = document.getElementById('musicPlayerModal');
    if (musicPlayerModal) musicPlayerModal.style.display = 'none';
    const videoPlayerModal = document.getElementById('videoPlayerModal');
    if (videoPlayerModal) videoPlayerModal.style.display = 'none';
    
    // Mostrar página selecionada
    if (page === 'inicio') {
      document.getElementById('inicioPage').style.display = 'block';
    } else if (page === 'radio') {
      document.getElementById('radioPage').style.display = 'block';
    } else if (page === 'culto') {
      document.getElementById('cultoPage').style.display = 'block';
      // Oculta a sidebar ao abrir Culto Ao Vivo
      var sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.style.display = 'none';
    } else if (page === 'oracao') {
      document.getElementById('oracaoPage').style.display = 'block';
      // Oculta a sidebar ao abrir pedidos de oração
      var sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.style.display = 'none';
    } else if (page === 'biblioteca') {
      document.getElementById('bibliotecaPage').style.display = 'block';
      const grid = document.querySelector('.category-grid');
      const detail = document.getElementById('libraryDetail');
      if (grid) grid.style.display = 'grid';
      if (detail) {
        detail.style.display = 'none';
        detail.innerHTML = '';
      }
    }
  }, { passive: false });
});

// Listener para Debates e Notícias com preventDefault para não mudar o ícone
document.querySelectorAll('.nav-item[data-page="debates"]').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Remove barra de rolagem da sidebar ao abrir debates
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.overflowY = 'hidden';
      // Remove item notícias se existir
      const noticiasItem = document.querySelector('.nav-item[data-page="noticias"]');
      if (noticiasItem) noticiasItem.remove();
    }
    const href = item.getAttribute('href');
    if (href && href !== '#') {
      window.location.href = href;
    }
  }, { passive: false });
});
 

// COMENTADO - Função duplicada que causa conflito com o listener acima
// function showPage(pageKey) {
//   try {
//     // Fechar qualquer overlay/modal que possa bloquear cliques
//     const playlistOverlay = document.getElementById('playlistOverlay');
//     if (playlistOverlay) {
//       try { playlistOverlay.remove(); } catch (_) {}
//     }
//     const musicPlayerModal = document.getElementById('musicPlayerModal');
//     if (musicPlayerModal) musicPlayerModal.style.display = 'none';
//     const videoPlayerModal = document.getElementById('videoPlayerModal');
//     if (videoPlayerModal) videoPlayerModal.style.display = 'none';
//     if (typeof resetVideoPlayer === 'function') {
//       resetVideoPlayer();
//     }
//
//     // Alternar estado visual do menu
//     document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
//     const targetItem = document.querySelector(`.nav-item[data-page="${pageKey}"]`);
//     if (targetItem) targetItem.classList.add('active');
//
//     // Esconder todas as páginas
//     const pages = ['inicio', 'radio', 'culto', 'oracao', 'biblioteca'];
//     pages.forEach(p => {
//       const el = document.getElementById(`${p}Page`);
//       if (el) el.style.display = 'none';
//     });
//
//     // Mostrar página selecionada
//     const selected = document.getElementById(`${pageKey}Page`);
//     if (selected) selected.style.display = 'block';
//
//     // Reset da biblioteca quando entrar
//     if (pageKey === 'biblioteca') {
//       const grid = document.querySelector('.category-grid');
//       const detail = document.getElementById('libraryDetail');
//       if (grid) grid.style.display = 'grid';
//       if (detail) {
//         detail.style.display = 'none';
//         detail.innerHTML = '';
//       }
//     }
//   } catch (_) {
//     // Evitar quebra do script por erros inesperados
//   }
// }

// Delegação de eventos: garante funcionamento do menu mesmo se listeners iniciais falharem
// COMENTADO PARA DAR AUTONOMIA AO USUÁRIO - Agora usa os handlers onclick do HTML
// document.addEventListener('click', (e) => {
//   const link = e.target.closest('.nav-item[data-page]');
//   if (link) {
//     e.preventDefault();
//     const page = link.dataset.page;
//     showPage(page);
//   }
// });

// Página inicial visível ao carregar, garantindo estado consistente
// COMENTADO - Dando autonomia ao usuário para escolher a página
// window.addEventListener('DOMContentLoaded', () => {
//   try {
//     // Se nenhuma página estiver marcada como ativa, mostrar Início
//     const anyActive = document.querySelector('.nav-item.active');
//     if (!anyActive) {
//       showPage('inicio');
//     }
//   } catch (_) {}
// });

// Delegação para os cards da biblioteca: abre detalhe da categoria
// COMENTADO - Deixando função renderLibraryDetail ser chamada apenas quando necessário
// document.addEventListener('click', (e) => {
//   const catCard = e.target.closest('.category-card[data-category]');
//   if (catCard) {
//     const key = catCard.dataset.category;
//     try {
//       renderLibraryDetail(key);
//     } catch (_) {
//       // Evitar quebra do script por erros inesperados
//     }
//   }
// });

// Botão "Ouvir Agora" no menu lateral
const listenBtn = document.querySelector('.listen-btn');
if (listenBtn) {
  listenBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Ativar item de menu Rádio
    const radioNavItem = document.querySelector('.nav-item[data-page="radio"]');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (radioNavItem) radioNavItem.classList.add('active');

    // Mostrar página de Rádio
    const inicioPage = document.getElementById('inicioPage');
    const radioPage = document.getElementById('radioPage');
    const cultoPage = document.getElementById('cultoPage');
    const oracaoPage = document.getElementById('oracaoPage');
    const bibliotecaPage = document.getElementById('bibliotecaPage');
    if (inicioPage) inicioPage.style.display = 'none';
    if (cultoPage) cultoPage.style.display = 'none';
    if (oracaoPage) oracaoPage.style.display = 'none';
    if (bibliotecaPage) bibliotecaPage.style.display = 'none';
    if (radioPage) radioPage.style.display = 'block';

    // Iniciar reprodução do player de rádio via gesto do usuário
    try {
      if (radioStream) {
        radioStream.play().then(() => {
          playIcon.textContent = '⏸';
          playPauseBtn.classList.add('is-playing');
          if (radioPlayer) { radioPlayer.classList.add('playing'); }
          isPlaying = true;
        }).catch(() => {
          // Se falhar, apenas focar no botão play para o usuário clicar
          if (playPauseBtn) { playPauseBtn.focus(); }
        });
      }
    } catch (_) {
      // Ignorar erros de reprodução
    }
  });
}

// Clique nos cards da biblioteca
document.querySelectorAll('.category-card[data-category]').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.category;
    renderLibraryDetail(key);
  });
});

// Player de Rádio
const radioStream = document.getElementById('radioStream');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.querySelector('.volume-value');
const radioPlayer = document.querySelector('.radio-player');

let isPlaying = false;

// Função Play/Pause (com verificações de segurança)
if (playPauseBtn && radioStream && playIcon) {
  playPauseBtn.addEventListener('click', () => {
    try {
      if (isPlaying) {
        radioStream.pause();
        playIcon.textContent = '⏵';
        playPauseBtn.classList.remove('is-playing');
        if (radioPlayer) { radioPlayer.classList.remove('playing'); }
        isPlaying = false;
      } else {
        radioStream.play().then(() => {
          playIcon.textContent = '⏸';
          playPauseBtn.classList.add('is-playing');
          if (radioPlayer) { radioPlayer.classList.add('playing'); }
          isPlaying = true;
        }).catch(() => {
          // Se o navegador bloquear, ao menos atualiza visualmente
          playIcon.textContent = '⏸';
          playPauseBtn.classList.add('is-playing');
          if (radioPlayer) { radioPlayer.classList.add('playing'); }
          isPlaying = true;
        });
      }
    } catch (_) {}
  });
}

// Controle de Volume
const volumeControl = document.querySelector('.volume-control');
const volumeIcon = document.querySelector('.volume-control .volume-icon');
let volumeMuted = false;

if (volumeIcon && radioStream && volumeControl) {
  volumeIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    volumeMuted = !volumeMuted;
    
    if (volumeMuted) {
      radioStream.muted = true;
      volumeControl.classList.add('volume-closed');
    } else {
      radioStream.muted = false;
      volumeControl.classList.remove('volume-closed');
    }
  });
}

if (volumeSlider && radioStream && volumeValue) {
  volumeSlider.addEventListener('input', (e) => {
    let volume = e.target.value;
    radioStream.volume = volume / 100;
    // Exibir 90% quando for 100%
    let displayVolume = (parseInt(volume, 10) === 100) ? 90 : volume;
    volumeValue.textContent = displayVolume + '%';
  });
  // Iniciar com volume padrão
  radioStream.volume = 0.8;
  // Corrigir exibição inicial se slider estiver em 100%
  if (volumeSlider.value === '100') {
    volumeValue.textContent = '90%';
  }
}

// Auto-play ao carregar (opcional – mantém mas protegido)
if (radioStream && playPauseBtn && playIcon) {
  window.addEventListener('load', () => {
    try {
      radioStream.play().then(() => {
        playIcon.textContent = '⏸';
        playPauseBtn.classList.add('is-playing');
        if (radioPlayer) { radioPlayer.classList.add('playing'); }
        isPlaying = true;
      }).catch(() => {
        // Navegador bloqueou autoplay
        // Não quebra nada; usuário clica para iniciar
      });
    } catch (_) {}
  });
}

// ==================== PLAYER DE MÚSICA MODAL ====================
const musicPlayerModal = document.getElementById('musicPlayerModal');
const musicAudio = document.getElementById('musicAudio');
const closePlayer = document.getElementById('closePlayer');
const musicPlayBtn = document.getElementById('musicPlayBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const musicVolumeSlider = document.getElementById('musicVolumeSlider');
const musicVolumeValue = document.getElementById('musicVolumeValue');
const playerAlbumCover = document.getElementById('playerAlbumCover');
const playerSongTitle = document.getElementById('playerSongTitle');
const playerArtistName = document.getElementById('playerArtistName');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPlaylist = [];
let currentTrackIndex = 0;

// Abrir player de música
function openMusicPlayer(albumData, artistName, trackIndex = 0) {
  currentPlaylist = albumData.filter(album => album.type === 'audio');
  currentTrackIndex = trackIndex;
  
  if (currentPlaylist.length === 0) return;
  
  loadTrack(currentTrackIndex, artistName);
  if (musicPlayerModal && musicAudio) {
    musicPlayerModal.style.display = 'flex';
    try { musicAudio.play(); } catch (_) {}
    
    // Marcar o ícone de áudio como playing
    const audioIcons = document.querySelectorAll('.file-icon-detail[data-type="audio"]');
    audioIcons.forEach(icon => icon.classList.add('playing'));
  }
}

// Carregar música
function loadTrack(index, artistName) {
  const track = currentPlaylist[index];
  if (!track) return;
  
  playerAlbumCover.src = track.cover || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop';
  playerSongTitle.textContent = track.name;
  playerArtistName.textContent = artistName;
  
  // URL de áudio de exemplo (substitua por URLs reais)
  musicAudio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  musicAudio.load();
}

// Fechar player
if (closePlayer && musicPlayerModal && musicAudio) {
  closePlayer.addEventListener('click', () => {
    try {
      musicPlayerModal.style.display = 'none';
      musicAudio.pause();
      musicAudio.currentTime = 0;
      
      // Remover classe playing dos ícones de áudio
      const audioIcons = document.querySelectorAll('.file-icon-detail[data-type="audio"]');
      audioIcons.forEach(icon => icon.classList.remove('playing'));
    } catch (_) {}
  });
}

// Play/Pause música
if (musicPlayBtn && musicAudio) {
  musicPlayBtn.addEventListener('click', () => {
    try {
      if (musicAudio.paused) {
        musicAudio.play();
        musicPlayBtn.textContent = '⏸';
      } else {
        musicAudio.pause();
        musicPlayBtn.textContent = '⏵';
      }
    } catch (_) {}
  });
}

// Atualizar barra de progresso
if (musicAudio && progressBar && currentTimeEl && totalTimeEl) {
  musicAudio.addEventListener('timeupdate', () => {
    try {
      if (musicAudio.duration) {
        const progress = (musicAudio.currentTime / musicAudio.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(musicAudio.currentTime);
        totalTimeEl.textContent = formatTime(musicAudio.duration);
      }
    } catch (_) {}
  });
}

// Atualizar posição da música
if (progressBar && musicAudio) {
  progressBar.addEventListener('input', (e) => {
    try {
      const seekTime = (e.target.value / 100) * (musicAudio.duration || 0);
      musicAudio.currentTime = seekTime;
    } catch (_) {}
  });
}

// Volume da música
if (musicVolumeSlider && musicAudio && musicVolumeValue) {
  musicVolumeSlider.addEventListener('input', (e) => {
    try {
      const volume = e.target.value;
      musicAudio.volume = volume / 100;
      musicVolumeValue.textContent = volume + '%';
    } catch (_) {}
  });
}

// Música anterior
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    try {
      currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
      loadTrack(currentTrackIndex, playerArtistName.textContent);
      musicAudio.play();
      musicPlayBtn.textContent = '⏸';
    } catch (_) {}
  });
}

// Próxima música
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    try {
      currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
      loadTrack(currentTrackIndex, playerArtistName.textContent);
      musicAudio.play();
      musicPlayBtn.textContent = '⏸';
    } catch (_) {}
  });
}

// Tocar próxima quando acabar
if (musicAudio) {
  musicAudio.addEventListener('ended', () => {
    try {
      currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
      loadTrack(currentTrackIndex, playerArtistName.textContent);
      musicAudio.play();
      musicPlayBtn.textContent = '⏸';
    } catch (_) {}
  });
}

// Formatar tempo
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Inicializar volume
musicAudio.volume = 0.7;

// Toggle para volume da música
const musicVolumeIcon = document.querySelector('.music-volume-icon');
const musicVolume = document.querySelector('.music-volume');
let musicVolumeMuted = false;

if (musicVolumeIcon && musicVolume && musicAudio) {
  musicVolumeIcon.addEventListener('click', (e) => {
    try {
      e.stopPropagation();
      musicVolumeMuted = !musicVolumeMuted;
      
      if (musicVolumeMuted) {
        musicAudio.muted = true;
        musicVolume.classList.add('volume-closed');
      } else {
        musicAudio.muted = false;
        musicVolume.classList.remove('volume-closed');
      }
    } catch (_) {}
  });
}

// Fechar ao clicar fora do player
if (musicPlayerModal && musicAudio) {
  musicPlayerModal.addEventListener('click', (e) => {
    try {
      if (e.target === musicPlayerModal) {
        musicPlayerModal.style.display = 'none';
        musicAudio.pause();
        
        // Remover classe playing dos ícones de áudio
        const audioIcons = document.querySelectorAll('.file-icon-detail[data-type="audio"]');
        audioIcons.forEach(icon => icon.classList.remove('playing'));
      }
    } catch (_) {}
  });
}

// ===== PLAYER DE VÍDEO =====
const videoPlayerModal = document.getElementById('videoPlayerModal');
const videoElement = document.getElementById('videoElement');
const closeVideoPlayerBtn = document.getElementById('closeVideoPlayer');
const playerVideoTitle = document.getElementById('playerVideoTitle');
const playerCategoryName = document.getElementById('playerCategoryName');
const videoDescription = document.getElementById('videoDescription');
const playerRating = document.getElementById('playerRating');
const userRatingStars = document.getElementById('userRatingStars');
const ratingMessage = document.getElementById('ratingMessage');
const commentsList = document.getElementById('videoCommentsList');
const commentForm = document.getElementById('commentForm');
const commentNameInput = document.getElementById('commentName');
const commentTextInput = document.getElementById('commentText');
let currentVideoKey = null;
const videoCommentsStore = {};
const videoRatingsStore = {};

function renderVideoComments(videoKey) {
  if (!commentsList) return;
  const comments = videoCommentsStore[videoKey] || [];
  if (!comments.length) {
    commentsList.innerHTML = '<li class="comment-empty">Seja o primeiro a comentar.</li>';
    return;
  }
  commentsList.innerHTML = comments.map((comment, idx) => `
    <li class="comment-item" data-comment-idx="${idx}">
      <div class="comment-author">${comment.author}</div>
      <div class="comment-text">${comment.text}</div>
      <div class="comment-date">${comment.date}</div>
    </li>
  `).join('');
}

function resetVideoPlayer() {
  if (!videoPlayerModal || !videoElement) return;
  videoPlayerModal.classList.remove('open');
  document.body.classList.remove('video-playing');
  try { videoElement.pause(); } catch (_) {}
  videoElement.src = '';
  videoElement.poster = '';
  currentVideoKey = null;
  if (commentsList) {
    commentsList.innerHTML = '<li class="comment-empty">Seja o primeiro a comentar.</li>';
  }
  if (commentTextInput) commentTextInput.value = '';
  if (commentNameInput) commentNameInput.value = '';
}

function openVideoPlayer(videoName, categoryName, videoSrc, poster, synopsis, popularity) {
  if (!videoPlayerModal || !videoElement) return;

  currentVideoKey = `${categoryName} | ${videoName}`;
  playerVideoTitle.textContent = videoName;
  playerCategoryName.textContent = categoryName;
  
  // Exibir sinopse com label
  if (synopsis) {
    videoDescription.innerHTML = `<strong>Sinopse:</strong> ${synopsis}`;
  } else {
    videoDescription.textContent = `Assistindo: ${videoName}`;
  }
  
  // Exibir estrelas baseadas em popularidade
  if (playerRating && popularity) {
    const stars = Math.round(popularity / 20); // Convertendo 0-100 para 0-5
    playerRating.textContent = '★'.repeat(Math.max(1, stars)) + '☆'.repeat(Math.max(0, 5 - stars));
  }
  
  // Restaurar avaliação do usuário se já existir
  if (userRatingStars) {
    const savedRating = videoRatingsStore[currentVideoKey];
    const stars = userRatingStars.querySelectorAll('.star');
    stars.forEach((star, idx) => {
      if (savedRating && idx < savedRating) {
        star.textContent = '★';
        star.classList.add('active');
      } else {
        star.textContent = '☆';
        star.classList.remove('active');
      }
    });
    
    if (savedRating && ratingMessage) {
      const messages = ['Ruim', 'Regular', 'Bom', 'Muito Bom', 'Excelente'];
      ratingMessage.textContent = `Você avaliou: ${messages[savedRating - 1]}`;
    } else if (ratingMessage) {
      ratingMessage.textContent = '';
    }
  }
  
  videoElement.src = videoSrc || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  videoElement.poster = poster || '';

  videoPlayerModal.classList.add('open');
  document.body.classList.add('video-playing');
  renderVideoComments(currentVideoKey);
  try { videoElement.play(); } catch (_) {}
  try { videoPlayerModal.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
}

if (commentForm && commentNameInput && commentTextInput) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentVideoKey) return;
    const text = commentTextInput.value.trim();
    const author = (commentNameInput.value || '').trim() || 'Anônimo';
    if (!text) return;

    const comment = {
      author,
      text,
      date: new Date().toLocaleString('pt-BR')
    };

    if (!videoCommentsStore[currentVideoKey]) {
      videoCommentsStore[currentVideoKey] = [];
    }
    videoCommentsStore[currentVideoKey].push(comment);
    commentTextInput.value = '';
    // Não limpar o nome para facilitar múltiplos comentários
    renderVideoComments(currentVideoKey);
  });
}

if (closeVideoPlayerBtn && videoPlayerModal && videoElement) {
  closeVideoPlayerBtn.addEventListener('click', () => {
    try {
      resetVideoPlayer();
    } catch (_) {}
  });
}

// Sistema de avaliação de filmes
if (userRatingStars) {
  userRatingStars.addEventListener('click', (e) => {
    if (e.target.classList.contains('star')) {
      const rating = parseInt(e.target.dataset.rating);
      if (!currentVideoKey) return;
      
      // Salvar avaliação
      videoRatingsStore[currentVideoKey] = rating;
      
      // Atualizar estrelas
      const stars = userRatingStars.querySelectorAll('.star');
      stars.forEach((star, idx) => {
        if (idx < rating) {
          star.textContent = '★';
          star.classList.add('active');
        } else {
          star.textContent = '☆';
          star.classList.remove('active');
        }
      });
      
      // Mostrar mensagem
      const messages = ['Ruim', 'Regular', 'Bom', 'Muito Bom', 'Excelente'];
      if (ratingMessage) {
        ratingMessage.textContent = `Você avaliou: ${messages[rating - 1]}`;
      }
    }
  });
  
  // Efeito hover nas estrelas
  userRatingStars.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('star')) {
      const rating = parseInt(e.target.dataset.rating);
      const stars = userRatingStars.querySelectorAll('.star');
      stars.forEach((star, idx) => {
        if (idx < rating) {
          star.textContent = '★';
        } else {
          star.textContent = '☆';
        }
      });
    }
  });
  
  userRatingStars.addEventListener('mouseout', () => {
    if (!currentVideoKey || !videoRatingsStore[currentVideoKey]) {
      const stars = userRatingStars.querySelectorAll('.star');
      stars.forEach(star => {
        star.textContent = '☆';
        star.classList.remove('active');
      });
    } else {
      const savedRating = videoRatingsStore[currentVideoKey];
      const stars = userRatingStars.querySelectorAll('.star');
      stars.forEach((star, idx) => {
        if (idx < savedRating) {
          star.textContent = '★';
          star.classList.add('active');
        } else {
          star.textContent = '☆';
          star.classList.remove('active');
        }
      });
    }
  });
}

// Clique direto nos cards de filmes abre o player
document.addEventListener('click', (e) => {
  const filmItem = e.target.closest('.film-item');
  if (!filmItem) return;
  if (e.target.closest('.download-btn')) return;

  const videoNameEl = filmItem.querySelector('.file-name');
  const videoName = videoNameEl ? videoNameEl.textContent : 'Filme';
  const categoryTitleEl = document.querySelector('.detail-title');
  const categoryName = categoryTitleEl ? categoryTitleEl.textContent : 'Categoria';
  const videoSrc = filmItem.dataset.videoSrc || '';
  const poster = filmItem.dataset.cover || '';
  const synopsis = filmItem.dataset.synopsis || '';
  const popularity = filmItem.dataset.popularity || '';
  openVideoPlayer(videoName, categoryName, videoSrc, poster, synopsis, popularity);
});

// Adicionar event delegation para botões de play nos álbuns e arquivos de áudio/vídeo
document.addEventListener('click', (e) => {
  if (e.target.closest('.download-btn.play')) {
    const btn = e.target.closest('.download-btn.play');
    const fileItem = btn.closest('.file-item, .album-item');
    const fileType = btn.getAttribute('data-type');
    
    if (!fileItem) return;

    // Se for vídeo, abrir player de vídeo
    if (fileType === 'video') {
      const nameEl = fileItem.querySelector('.file-name');
      const videoName = nameEl ? nameEl.textContent : 'Vídeo';
      const categoryTitleEl = document.querySelector('.detail-title');
      const categoryName = categoryTitleEl ? categoryTitleEl.textContent : 'Categoria';
      openVideoPlayer(videoName, categoryName);
      return;
    }

    // Verificar se é álbum (em Músicas) com tracks
    const albumItem = btn.closest('.album-item');
    
    if (albumItem && albumItem.dataset.hasTracks === 'true') {
      // Caso de álbum em Músicas com tracks - abrir apenas a playlist
      const albumIdx = parseInt(albumItem.dataset.albumIdx);
      const artistNameEl = document.querySelector('.detail-title');
      const artistName = artistNameEl ? artistNameEl.textContent : 'Artista';
      
      // Procurar o artista atual nos dados
      const currentPage = document.querySelector('.page-musicas');
      if (currentPage) {
        // Encontrar os dados do artista para obter os tracks corretos
        // A categoria e artista estão no escopo da função renderArtistAlbums
        // Vamos triggerar o clique no álbum que já abre a playlist corretamente
        albumItem.click();
      }
      return;
    } else if (albumItem) {
      // Caso de álbum sem tracks - não fazer nada
      return;
    }
    
    // Caso de arquivo de áudio em outras categorias
    const fileItemRegular = btn.closest('.file-item');
    if (!fileItemRegular) return;

    const categoryTitleEl = document.querySelector('.detail-title');
    const categoryName = categoryTitleEl ? categoryTitleEl.textContent : 'Categoria';
    
    // Buscar todos os arquivos de áudio da categoria atual
    const allAudioFiles = Array.from(document.querySelectorAll('.file-item')).map(item => {
      const nameEl = item.querySelector('.file-name');
      const name = nameEl ? nameEl.textContent : '';
      const iconEl = item.querySelector('.file-icon');
      const icon = iconEl ? iconEl.textContent : '🎵';
      return {
        name,
        icon,
        cover: `https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop`,
        type: 'audio'
      };
    }).filter(file => {
      // Filtrar apenas arquivos de áudio
      const item = Array.from(document.querySelectorAll('.file-item')).find(el => {
        const nameEl = el.querySelector('.file-name');
        return nameEl && nameEl.textContent === file.name;
      });
      return item && item.querySelector('.download-btn.play');
    });
    
    const clickedIndex = Array.from(document.querySelectorAll('.file-item')).indexOf(fileItemRegular);
    openMusicPlayer(allAudioFiles, categoryName, clickedIndex);
  }
});

// ==================== FORMULÁRIO DE PEDIDOS DE ORAÇÃO ====================
const prayerForm = document.getElementById('prayerForm');
if (prayerForm) {
  prayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('prayerName').value.trim();
    const email = document.getElementById('prayerEmail').value.trim();
    const request = document.getElementById('prayerRequest').value.trim();
    
    if (!request) {
      alert('Por favor, escreva seu pedido de oração.');
      return;
    }
    
    // Dados do formulário a serem enviados ao backend
    const prayerData = {
      name: name || 'Anônimo',
      email: email || '',
      request: request,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    // TODO: Integrar com banco de dados aqui
    console.log('Pedido de oração enviado:', prayerData);
    
    // Feedback ao usuário
    alert('Obrigado! Seu pedido foi recebido. Nossa equipe estará intercedendo por você.');
    prayerForm.reset();
    
    // Aqui você colocará a lógica para enviar ao backend:
    // fetch('/api/prayer-requests', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(prayerData)
    // }).then(response => response.json())
    //   .then(data => {
    //     alert('Pedido enviado com sucesso!');
    //     prayerForm.reset();
    //   })
    //   .catch(error => console.error('Erro:', error));
  });
}

// ==================== MODAL DE TERMOS / AVISO DE DIREITOS ====================
const openTermsModalBtn = document.getElementById('openTermsModal');
const closeTermsModalBtn = document.getElementById('closeTermsModal');
const termsModal = document.getElementById('termsModal');

function openTermsModal() {
  if (!termsModal) return;
  termsModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  termsModal.setAttribute('aria-hidden', 'false');
  // Oculta a sidebar ao abrir o aviso completo
  var sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.style.display = 'none';
}

function closeTermsModal() {
  if (!termsModal) return;
  termsModal.classList.remove('open');
  document.body.style.overflow = '';
  termsModal.setAttribute('aria-hidden', 'true');
  // Reexibe a sidebar ao fechar o aviso completo
  var sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.style.display = '';
}

if (openTermsModalBtn) {
  openTermsModalBtn.addEventListener('click', openTermsModal);
}

if (closeTermsModalBtn) {
  closeTermsModalBtn.addEventListener('click', closeTermsModal);
}

if (termsModal) {
  termsModal.addEventListener('click', (e) => {
    if (e.target === termsModal || e.target.classList.contains('terms-modal-backdrop')) {
      closeTermsModal();
    }
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && termsModal && termsModal.classList.contains('open')) {
    closeTermsModal();
  }
});

