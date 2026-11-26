export type PageId =
  | 'inicio'
  | 'historia'
  | 'trajeto'
  | 'locomotivas'
  | 'trabalhadores'
  | 'cultura'
  | 'patrimonio'
  | 'rota'
  | 'linha-do-tempo'
  | 'galeria'
  | 'curiosidades'
  | 'sobre';

export const pages: { id: PageId; label: string; short?: string }[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'historia', label: 'História' },
  { id: 'trajeto', label: 'Trajeto e estações', short: 'Trajeto' },
  { id: 'locomotivas', label: 'Locomotivas' },
  { id: 'trabalhadores', label: 'Trabalhadores ferroviários', short: 'Trabalhadores' },
  { id: 'cultura', label: 'Cultura e memória', short: 'Cultura' },
  { id: 'patrimonio', label: 'Patrimônio histórico', short: 'Patrimônio' },
  { id: 'rota', label: 'Rota Bahia–Minas', short: 'Rota atual' },
  { id: 'linha-do-tempo', label: 'Linha do tempo', short: 'Cronologia' },
  { id: 'galeria', label: 'Galeria histórica', short: 'Acervo' },
  { id: 'curiosidades', label: 'Curiosidades' },
  { id: 'sobre', label: 'Sobre o projeto', short: 'Sobre' },
];

export const timeline = [
  {
    year: '1878–79',
    title: 'Concessões e projeto',
    text: 'Leis provinciais em Minas Gerais e na Bahia deram base ao empreendimento. O engenheiro Miguel de Teive e Argolo recebeu a concessão para construir e explorar a linha.',
  },
  {
    year: '1881',
    title: 'O primeiro movimento',
    text: 'A construção e a operação dos primeiros trechos começaram no litoral baiano. A ferrovia avançou de Ponta de Areia, em Caravelas, rumo ao interior.',
  },
  {
    year: '1898',
    title: 'Chegada a Teófilo Otoni',
    text: 'A ligação ferroviária alcançou o principal centro urbano do Vale do Mucuri, ampliando o fluxo de pessoas, mercadorias e correspondências.',
  },
  {
    year: '1910–12',
    title: 'Mudança de administração',
    text: 'A União encampou a estrada e, depois, entregou sua operação à companhia franco-belga Chemins de Fer Fédéraux de l’Est Brésilien.',
  },
  {
    year: '1918',
    title: 'Os trilhos chegam a Ladainha',
    text: 'A expansão ao norte de Teófilo Otoni aprofundou a integração do Vale do Mucuri com o Jequitinhonha.',
  },
  {
    year: '1942',
    title: 'Ponto final em Araçuaí',
    text: 'A linha alcançou Araçuaí, no Vale do Jequitinhonha, completando seu eixo entre o interior mineiro e o litoral baiano.',
  },
  {
    year: '1966',
    title: 'Encerramento',
    text: 'A Estrada de Ferro Bahia e Minas foi desativada. Trilhos foram retirados, mas estações, objetos, canções e lembranças permaneceram.',
  },
];

export const stations = [
  {
    name: 'Ponta de Areia',
    state: 'Caravelas · Bahia',
    role: 'Marco inicial',
    text: 'No litoral de Caravelas, Ponta de Areia foi a extremidade marítima da linha. É o lugar que deu nome à canção de Milton Nascimento e Fernando Brant.',
  },
  {
    name: 'Caravelas',
    state: 'Bahia',
    role: 'Porta para o litoral',
    text: 'O município abrigou a conexão da ferrovia com o litoral sul baiano e participou dos primeiros anos de implantação da estrada.',
  },
  {
    name: 'Serra dos Aimorés',
    state: 'Minas Gerais',
    role: 'Fronteira regional',
    text: 'A passagem pelo território de Serra dos Aimorés marca a entrada da linha em Minas Gerais e o avanço pelo Vale do Mucuri.',
  },
  {
    name: 'Nanuque',
    state: 'Minas Gerais',
    role: 'Entreposto do Mucuri',
    text: 'A ferrovia contribuiu para a circulação regional e para a consolidação urbana de Nanuque como ponto de passagem e comércio.',
  },
  {
    name: 'Carlos Chagas',
    state: 'Minas Gerais',
    role: 'Eixo de circulação',
    text: 'A estação integrou a localidade aos fluxos de passageiros, produção agrícola, madeira, animais e mercadorias do Vale do Mucuri.',
  },
  {
    name: 'Teófilo Otoni',
    state: 'Minas Gerais',
    role: 'Centro regional · 1898',
    text: 'A chegada da linha em 1898 conectou um dos principais centros comerciais do nordeste mineiro ao litoral.',
  },
  {
    name: 'Ladainha',
    state: 'Minas Gerais',
    role: 'Expansão · 1918',
    text: 'A ferrovia chegou em 1918. A memória ferroviária permanece fortemente associada à formação urbana e às famílias da cidade.',
  },
  {
    name: 'Novo Cruzeiro',
    state: 'Minas Gerais',
    role: 'Rumo ao Jequitinhonha',
    text: 'O trecho integrou a marcha da ferrovia em direção a Araçuaí e articulou comunidades do Mucuri e do Jequitinhonha.',
  },
  {
    name: 'Araçuaí',
    state: 'Minas Gerais',
    role: 'Terminal · 1942',
    text: 'Alcançada em 1942, Araçuaí tornou-se a extremidade mineira da estrada e o ponto final da expansão ferroviária.',
  },
];

export type GalleryItem = {
  src: string;
  category: 'Locomotivas' | 'Mapas' | 'Patrimônio' | 'Documentos';
  title: string;
  date: string;
  place: string;
  credit: string;
  description: string;
  object?: string;
};

export const gallery: GalleryItem[] = [
  {
    src: '/archive/henschel-efbm.webp',
    category: 'Locomotivas',
    title: 'Locomotiva Henschel para a EFBM',
    date: 'c. 1939',
    place: 'Fábrica Henschel & Sohn, Alemanha',
    credit: 'Henschel & Sohn / Wikimedia Commons',
    description: 'Registro de fábrica de locomotiva a vapor de bitola métrica destinada à Estrada de Ferro Bahia e Minas.',
    object: 'object-contain bg-[#ded7c8]',
  },
  {
    src: '/archive/pojixa.webp',
    category: 'Patrimônio',
    title: 'Locomotiva Pojixá preservada',
    date: 'Registro contemporâneo',
    place: 'Teófilo Otoni, MG',
    credit: 'Wikimedia Commons · licença indicada no acervo',
    description: 'Exemplar preservado como monumento à memória ferroviária. Esta é uma fotografia atual, não um registro de operação.',
  },
  {
    src: '/archive/mapa-efbm.webp',
    category: 'Mapas',
    title: 'Traçado da Estrada de Ferro Bahia e Minas',
    date: 'Ilustração contemporânea',
    place: 'Bahia e Minas Gerais',
    credit: 'Wikimedia Commons',
    description: 'Representação esquemática do percurso entre o litoral de Caravelas e Araçuaí.',
    object: 'object-contain bg-[#f1eee4]',
  },
  {
    src: '/archive/mapa-1913.webp',
    category: 'Documentos',
    title: 'A EFBM no mapa do Estado da Bahia',
    date: '1913',
    place: 'Bahia',
    credit: 'Estado da Bahia, 1913 / Wikimedia Commons',
    description: 'Detalhe de documento cartográfico histórico que identifica a Estrada de Ferro Bahia e Minas.',
    object: 'object-contain bg-[#e8dfcc]',
  },
  {
    src: '/archive/ponta-de-areia-atual.webp',
    category: 'Patrimônio',
    title: 'Vestígios em Ponta de Areia',
    date: 'Registro contemporâneo',
    place: 'Caravelas, BA',
    credit: 'Panoramio / Wikimedia Commons',
    description: 'Registro atual da localidade. A data e o contexto devem ser observados para não confundir a imagem com fotografia histórica.',
  },
  {
    src: '/archive/paper-route.webp',
    category: 'Mapas',
    title: 'A linha como paisagem',
    date: 'Ilustração contemporânea',
    place: 'Produção editorial',
    credit: 'Imagem gerada para este projeto',
    description: 'Interpretação gráfica inspirada em mapas e linhas topográficas; não é um documento histórico nem representa coordenadas reais.',
  },
];

export const sources = [
  {
    name: 'Biblioteca Nacional Digital · Hemeroteca',
    note: 'Periódicos, relatórios e documentos digitalizados para pesquisa histórica.',
    url: 'https://bndigital.bn.gov.br/hemeroteca-digital/',
  },
  {
    name: 'IBGE · Biblioteca',
    note: 'Enciclopédia dos Municípios Brasileiros e publicações geográficas.',
    url: 'https://biblioteca.ibge.gov.br/',
  },
  {
    name: 'Wikimedia Commons · Acervo EFBM',
    note: 'Mapas, documento de 1913 e imagens com metadados e licenças.',
    url: 'https://commons.wikimedia.org/wiki/Category:Rail_transport_in_Bahia',
  },
  {
    name: 'Museu da Pessoa',
    note: 'Histórias de vida, depoimentos e memória social de trabalhadores brasileiros.',
    url: 'https://museudapessoa.org/',
  },
  {
    name: 'Rede Minas · série Estações',
    note: 'Série documental sobre a antiga linha e as comunidades do percurso.',
    url: 'https://redeminas.tv/',
  },
  {
    name: 'IPHAN',
    note: 'Referência institucional para políticas de preservação do patrimônio cultural.',
    url: 'https://www.gov.br/iphan/',
  },
];

export const searchIndex: { title: string; text: string; page: PageId }[] = [
  ...pages.map((page) => ({ title: page.label, text: page.short || page.label, page: page.id })),
  ...timeline.map((item) => ({ title: `${item.year} — ${item.title}`, text: item.text, page: 'linha-do-tempo' as PageId })),
  ...stations.map((item) => ({ title: item.name, text: `${item.state} ${item.role} ${item.text}`, page: 'trajeto' as PageId })),
  ...gallery.map((item) => ({ title: item.title, text: `${item.category} ${item.place} ${item.description}`, page: 'galeria' as PageId })),
];
