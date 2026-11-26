import { useEffect, useMemo, useState } from 'react';
import { GalleryItem, PageId, gallery, pages, searchIndex, sources, stations, timeline } from './data';

type Navigate = (page: PageId) => void;

const Arrow = ({ direction = 'right' }: { direction?: 'right' | 'left' | 'up' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={`size-5 ${direction === 'left' ? 'rotate-180' : direction === 'up' ? '-rotate-90' : ''}`} aria-hidden="true">
    <path d="M5 12h14M14 7l5 5-5 5" />
  </svg>
);

const Icon = ({ name }: { name: 'menu' | 'close' | 'search' | 'expand' }) => {
  const paths = {
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m5 5 14 14M19 5 5 19" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    expand: <><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5" aria-hidden="true">{paths[name]}</svg>;
};

function navigateTo(page: PageId) {
  window.location.hash = page === 'inicio' ? '' : page;
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="group flex items-center gap-3 text-left" aria-label="Ir para o início">
      <span className="relative grid size-11 place-items-center rounded-full border border-[#a97845]/50 text-[#c7995d]">
        <svg viewBox="0 0 40 40" fill="none" className="size-8" aria-hidden="true">
          <path d="M11 29 20 8l9 21M14.3 22h11.4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M7 32h26M9 35h22" stroke="currentColor" strokeWidth="1" />
        </svg>
      </span>
      <span>
        <span className="block font-display text-lg leading-none tracking-[.03em] text-[#f4ecda]">Bahia–Minas</span>
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[.2em] text-[#b9ad98]">Museu Digital</span>
      </span>
    </button>
  );
}

function Header({ page, navigate }: { page: PageId; navigate: Navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const clean = query.trim().toLocaleLowerCase('pt-BR');
    return clean ? searchIndex.filter((item) => `${item.title} ${item.text}`.toLocaleLowerCase('pt-BR').includes(clean)).slice(0, 8) : [];
  }, [query]);

  function go(id: PageId) {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery('');
    navigate(id);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1d211b]/95 text-white backdrop-blur-xl">
        <div className="museum-container flex h-[76px] items-center justify-between">
          <Logo onClick={() => go('inicio')} />
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegação principal">
            {pages.slice(0, 7).map((item) => (
              <button key={item.id} onClick={() => go(item.id)} className={`nav-link ${page === item.id ? 'active' : ''}`}>
                {item.short || item.label}
              </button>
            ))}
            <button onClick={() => setMenuOpen(true)} className="nav-link flex items-center gap-2">Mais <span className="text-[#c89b62]">＋</span></button>
          </nav>
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} className="icon-button" aria-label="Buscar no acervo"><Icon name="search" /></button>
            <button onClick={() => setMenuOpen(true)} className="icon-button xl:hidden" aria-label="Abrir menu"><Icon name="menu" /></button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-50 transition ${menuOpen ? 'visible' : 'invisible delay-300'}`} aria-hidden={!menuOpen}>
        <button onClick={() => setMenuOpen(false)} className={`absolute inset-0 bg-[#11150f]/70 backdrop-blur-sm transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0'}`} aria-label="Fechar menu" />
        <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#efe8d8] p-7 shadow-2xl transition-transform duration-500 sm:p-10 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-[#493728]/15 pb-7">
            <p className="eyebrow !text-[#785e3c]">Navegue pelo museu</p>
            <button onClick={() => setMenuOpen(false)} className="icon-button !border-[#392c22]/20 !text-[#392c22]" aria-label="Fechar menu"><Icon name="close" /></button>
          </div>
          <nav className="mt-6 grid overflow-y-auto" aria-label="Todas as páginas">
            {pages.map((item, index) => (
              <button key={item.id} onClick={() => go(item.id)} className={`menu-link ${page === item.id ? 'active' : ''}`}>
                <span className="font-mono text-[10px] text-[#9a7852]">{String(index + 1).padStart(2, '0')}</span>
                <span>{item.label}</span>
                <Arrow />
              </button>
            ))}
          </nav>
          <p className="mt-auto pt-7 text-xs leading-5 text-[#766956]">Um acervo em construção dedicado à memória da Estrada de Ferro Bahia e Minas.</p>
        </aside>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#151914]/95 p-4 text-white backdrop-blur-xl sm:p-10">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-6">
              <p className="eyebrow">Pesquisa no acervo</p>
              <button onClick={() => setSearchOpen(false)} className="icon-button" aria-label="Fechar busca"><Icon name="close" /></button>
            </div>
            <label className="mt-10 flex items-center gap-4 border-b border-[#c89b62] pb-4">
              <Icon name="search" />
              <span className="sr-only">Termo de busca</span>
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent font-display text-3xl outline-none placeholder:text-white/30 sm:text-5xl" placeholder="O que você procura?" />
            </label>
            <div className="mt-8">
              {!query && <p className="text-sm text-white/50">Busque por cidades, datas, locomotivas, estações ou temas.</p>}
              {query && results.length === 0 && <p className="text-sm text-white/50">Nenhum resultado encontrado. Tente outro termo.</p>}
              {results.map((result) => (
                <button key={`${result.page}-${result.title}`} onClick={() => go(result.page)} className="flex w-full items-center justify-between border-b border-white/10 py-5 text-left hover:text-[#d7ad76]">
                  <span><span className="block font-display text-2xl">{result.title}</span><span className="mt-1 block text-xs text-white/45">{pages.find((p) => p.id === result.page)?.label}</span></span>
                  <Arrow />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Footer({ navigate }: { navigate: Navigate }) {
  return (
    <footer className="bg-[#171b16] text-[#bdb4a3]">
      <div className="museum-container grid gap-12 py-16 lg:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <Logo onClick={() => navigate('inicio')} />
          <p className="mt-6 max-w-md text-sm leading-7">Uma plataforma cultural independente para preservar, organizar e compartilhar a memória da Estrada de Ferro Bahia e Minas.</p>
        </div>
        <div>
          <p className="footer-title">Explore</p>
          <div className="mt-5 grid gap-3 text-sm">
            {pages.slice(1, 7).map((item) => <button key={item.id} onClick={() => navigate(item.id)} className="w-fit hover:text-[#d0a66f]">{item.short || item.label}</button>)}
          </div>
        </div>
        <div>
          <p className="footer-title">Pesquisa</p>
          <div className="mt-5 grid gap-3 text-sm">
            {pages.slice(7).map((item) => <button key={item.id} onClick={() => navigate(item.id)} className="w-fit hover:text-[#d0a66f]">{item.short || item.label}</button>)}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="museum-container flex flex-col gap-3 py-6 text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2025 Museu Digital Bahia–Minas</span>
          <span>Memória, território e patrimônio ferroviário</span>
        </div>
      </div>
    </footer>
  );
}

function PageHero({ kicker, title, intro, image = '/archive/paper-route.webp', children }: { kicker: string; title: string; intro: string; image?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[#23281f] text-white">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f19] via-[#1a1f19]/85 to-[#1a1f19]/20" />
      <div className="museum-container relative flex min-h-[430px] flex-col justify-end py-16 sm:min-h-[500px] sm:py-20">
        <p className="eyebrow">{kicker}</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[.95] tracking-[-.03em] sm:text-7xl lg:text-[5.7rem]">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">{intro}</p>
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, intro, light = false }: { kicker: string; title: string; intro?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className={`eyebrow ${light ? '' : '!text-[#8a6840]'}`}>{kicker}</p>
      <h2 className={`mt-4 font-display text-4xl leading-[1.02] tracking-[-.025em] sm:text-6xl ${light ? 'text-white' : 'text-[#2c271f]'}`}>{title}</h2>
      {intro && <p className={`mt-5 max-w-2xl leading-7 ${light ? 'text-white/65' : 'text-[#6d6254]'}`}>{intro}</p>}
    </div>
  );
}

function SourceNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 border-l border-[#aa7d4f] pl-4 text-xs leading-5 text-[#7a6e5e]"><strong>Nota de pesquisa.</strong> {children}</p>;
}

function Home({ navigate }: { navigate: Navigate }) {
  return (
    <>
      <section className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#151914] text-white">
        <img src="/archive/henschel-efbm.webp" alt="Registro de fábrica de uma locomotiva Henschel destinada à Estrada de Ferro Bahia e Minas" className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,17,12,.95)_0%,rgba(13,17,12,.68)_48%,rgba(13,17,12,.15)_100%)]" />
        <div className="absolute inset-0 archival-grain" />
        <div className="museum-container relative flex min-h-[calc(100vh-76px)] flex-col justify-center py-20">
          <p className="eyebrow">Museu Digital · Bahia & Minas Gerais</p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(4.2rem,10vw,9.8rem)] leading-[.78] tracking-[-.055em]">
            Estrada de Ferro <span className="block italic text-[#d1a66e]">Bahia–Minas</span>
          </h1>
          <div className="mt-9 max-w-xl border-l border-[#c89b62] pl-6">
            <p className="font-display text-2xl leading-tight text-[#eee3d2]">Uma ferrovia, muitas histórias e um legado que permanece.</p>
            <p className="mt-3 text-sm leading-6 text-white/60">Dos trilhos entre Ponta de Areia e Araçuaí às memórias que ainda atravessam o Vale do Mucuri.</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => navigate('historia')} className="button-primary">Conheça nossa história <Arrow /></button>
            <button onClick={() => navigate('galeria')} className="button-ghost">Explore o acervo <Icon name="expand" /></button>
          </div>
        </div>
        <p className="absolute bottom-5 right-5 max-w-xs bg-black/40 px-3 py-2 text-[10px] leading-4 text-white/60 backdrop-blur-md">Registro de fábrica Henschel & Sohn, c. 1939. Wikimedia Commons.</p>
      </section>

      <section className="paper-section py-24">
        <div className="museum-container grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="font-mono text-xs text-[#947044]">1881 — 1966</p>
            <h2 className="mt-5 font-display text-5xl leading-[.97] text-[#302920] sm:text-7xl">Mais que uma linha no mapa.</h2>
          </div>
          <div className="max-w-2xl">
            <p className="font-display text-2xl leading-9 text-[#4d4033]">A Bahia–Minas transportou mercadorias, notícias, sonhos e despedidas. Ao ligar o litoral sul baiano ao nordeste mineiro, transformou a vida econômica e social de muitas comunidades.</p>
            <p className="mt-6 text-sm leading-7 text-[#736758]">Hoje, seus trilhos já não conduzem trens. Mas a ferrovia permanece na forma das cidades, nas estações, na música e na memória de quem ouviu o apito atravessar os vales.</p>
            <SourceNote>As datas e a extensão são apresentadas conforme documentação e bibliografia indicadas na página “Sobre”. Divergências entre fontes são sinalizadas.</SourceNote>
          </div>
        </div>
      </section>

      <section className="bg-[#263026] py-20 text-white">
        <div className="museum-container grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[['85 anos', 'entre o início da operação e o encerramento'], ['~578 km', 'extensão total citada na bibliografia'], ['2 estados', 'Bahia e Minas Gerais unidos pelos trilhos']].map(([number, label]) => (
            <div key={number} className="px-0 py-7 first:pt-0 sm:px-10 sm:py-2 sm:first:pl-0">
              <strong className="block font-display text-5xl font-normal text-[#d2ac78] sm:text-6xl">{number}</strong>
              <span className="mt-3 block max-w-[220px] text-xs leading-5 text-white/55">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f0e6] py-24">
        <div className="museum-container">
          <SectionTitle kicker="Linha do tempo" title="A história sobre trilhos" intro="Cinco momentos para compreender a expansão, a transformação e o fim da ferrovia." />
          <div className="mt-14 grid gap-px bg-[#c9bca6] md:grid-cols-5">
            {timeline.filter((_, i) => [1, 2, 4, 5, 6].includes(i)).map((item, index) => (
              <button key={item.year} onClick={() => navigate('linha-do-tempo')} className="group bg-[#f5f0e6] p-6 text-left hover:bg-[#ece3d2]">
                <span className="font-mono text-xs text-[#8b673e]">{item.year}</span>
                <span className="mt-9 block font-display text-2xl leading-tight">{item.title}</span>
                <span className="mt-6 block translate-x-0 text-[#9c7142] transition-transform group-hover:translate-x-2"><Arrow /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ded5c4] py-24">
        <div className="museum-container grid gap-8 lg:grid-cols-2">
          <figure className="image-frame lg:row-span-2">
            <img src="/archive/pojixa.webp" alt="Locomotiva Pojixá preservada em Teófilo Otoni" className="h-full min-h-[560px] w-full object-cover" />
            <figcaption>Locomotiva Pojixá, patrimônio preservado · Registro contemporâneo · Wikimedia Commons</figcaption>
          </figure>
          <div className="flex flex-col justify-between bg-[#312a21] p-8 text-white sm:p-12">
            <div>
              <p className="eyebrow">Patrimônio</p>
              <h2 className="mt-5 font-display text-5xl leading-none">O que resta também conta.</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">Estações, pontes, locomotivas e lembranças formam um acervo espalhado pelo território. Preservá-lo é manter legível uma parte decisiva da história regional.</p>
            </div>
            <button onClick={() => navigate('patrimonio')} className="mt-10 link-arrow">Conheça os vestígios <Arrow /></button>
          </div>
          <div className="bg-[#8a4d35] p-8 text-white sm:p-12">
            <p className="font-display text-3xl italic leading-tight">“Ponta de areia, ponto final da Bahia–Minas...”</p>
            <p className="mt-5 text-xs uppercase tracking-[.16em] text-white/55">Milton Nascimento e Fernando Brant · referência à canção, sem reprodução integral</p>
          </div>
        </div>
      </section>
    </>
  );
}

function History() {
  const chapters = [
    ['Um projeto entre dois territórios', 'A origem da EFBM está ligada às concessões provinciais de 1878 e 1879 e ao projeto do engenheiro Miguel de Teive e Argolo. A intenção era aproximar o interior mineiro de um ponto marítimo no sul da Bahia, criando uma nova via para pessoas e produtos.'],
    ['Construir através do Mucuri', 'As obras começaram no início da década de 1880 a partir de Ponta de Areia. Em um território de rios, matas e longas distâncias, a implantação dependia de mão de obra numerosa, engenharia, oficinas, pontes e abastecimento constante.'],
    ['Expansão e administração', 'O avanço a Teófilo Otoni, em 1898, transformou a circulação regional. Em 1910, a União encampou a ferrovia; em 1912, a operação passou à companhia franco-belga Chemins de Fer Fédéraux de l’Est Brésilien, permanecendo sob diferentes administrações nas décadas seguintes.'],
    ['Do Mucuri ao Jequitinhonha', 'Depois de Ladainha, alcançada em 1918, a linha continuou em direção ao Vale do Jequitinhonha. Em 1942, chegou a Araçuaí, completando o eixo ferroviário pelo qual a estrada é lembrada.'],
    ['O fim dos trens, a permanência da memória', 'Em 1966, a linha foi desativada. A retirada dos trilhos interrompeu um sistema de deslocamento e trabalho que estruturava a vida local. O encerramento, porém, não apagou seus efeitos — nem as memórias familiares, os edifícios e a paisagem cultural.'],
  ];
  return (
    <>
      <PageHero kicker="História · 1878—1966" title="Uma estrada entre o mar e os vales" intro="A construção da Bahia–Minas foi uma obra de conexão territorial. Sua história reúne engenharia, interesses econômicos, trabalho e a transformação profunda das cidades." image="/archive/mapa-1913.webp" />
      <section className="paper-section py-24">
        <div className="museum-container">
          <div className="grid gap-16 lg:grid-cols-[.35fr_.65fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-display text-3xl italic text-[#7c5b36]">“Bahiminas”</p>
              <p className="mt-4 text-sm leading-6 text-[#766957]">O nome popular sintetiza a ligação entre Bahia e Minas Gerais — uma estrada que atravessou fronteiras e criou vínculos duradouros.</p>
              <SourceNote>Algumas fontes diferenciam inauguração formal, início de operação e abertura de trechos. Este portal usa 1881 como marco inicial, explicitando a expansão por etapas.</SourceNote>
            </aside>
            <div>
              {chapters.map(([title, text], i) => (
                <article key={title} className="history-chapter">
                  <span className="font-mono text-xs text-[#a17a49]">{String(i + 1).padStart(2, '0')}</span>
                  <div><h2 className="font-display text-4xl leading-tight">{title}</h2><p className="mt-5 leading-8 text-[#675c4e]">{text}</p></div>
                </article>
              ))}
            </div>
          </div>
          <figure className="image-frame mt-20">
            <img src="/archive/mapa-1913.webp" alt="Documento cartográfico de 1913 com indicação da Estrada de Ferro Bahia e Minas" className="max-h-[720px] w-full object-contain bg-[#e6ddc8]" />
            <figcaption>Documento cartográfico do Estado da Bahia, 1913 · Acervo Wikimedia Commons</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}

function RoutePage() {
  const [selected, setSelected] = useState(0);
  const current = stations[selected];
  return (
    <>
      <PageHero kicker="Território" title="Trajeto e estações" intro="Do litoral sul da Bahia ao Vale do Jequitinhonha: um percurso que costurou cidades, economias e modos de vida." image="/archive/mapa-efbm.webp" />
      <section className="bg-[#ece5d6] py-24">
        <div className="museum-container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative overflow-hidden border border-[#9c8a6e]/30 bg-[#e2dac8] p-5 sm:p-10">
              <img src="/archive/mapa-efbm.webp" alt="Mapa esquemático da Estrada de Ferro Bahia e Minas" className="h-[500px] w-full object-contain mix-blend-multiply" />
              <p className="absolute bottom-3 left-4 text-[10px] text-[#6d5d49]">Mapa esquemático · Wikimedia Commons. Consulte a fonte para escala e metodologia.</p>
            </div>
            <div className="bg-[#283026] p-7 text-white sm:p-10">
              <p className="eyebrow">Estação selecionada · {String(selected + 1).padStart(2, '0')}</p>
              <h2 className="mt-5 font-display text-5xl">{current.name}</h2>
              <p className="mt-2 text-sm text-[#c9a36e]">{current.state}</p>
              <p className="mt-8 text-xs uppercase tracking-[.16em] text-white/40">{current.role}</p>
              <p className="mt-4 leading-8 text-white/70">{current.text}</p>
              <div className="mt-10 flex gap-2">
                <button onClick={() => setSelected((selected - 1 + stations.length) % stations.length)} className="square-button" aria-label="Estação anterior"><Arrow direction="left" /></button>
                <button onClick={() => setSelected((selected + 1) % stations.length)} className="square-button" aria-label="Próxima estação"><Arrow /></button>
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-px border border-[#b9aa91] bg-[#b9aa91] sm:grid-cols-2 lg:grid-cols-3">
            {stations.map((station, i) => (
              <button key={station.name} onClick={() => setSelected(i)} className={`station-button ${selected === i ? 'active' : ''}`}>
                <span className="font-mono text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                <span><strong>{station.name}</strong><small>{station.state}</small></span>
                <span className="ml-auto">＋</span>
              </button>
            ))}
          </div>
          <SourceNote>Este mapa é esquemático. Os pontos não funcionam como coordenadas geográficas. A identificação do trajeto deve ser conferida com cartas e documentação ferroviária.</SourceNote>
        </div>
      </section>
    </>
  );
}

function Locomotives() {
  return (
    <>
      <PageHero kicker="Máquinas e viagens" title="O vapor que movia os vales" intro="Locomotivas, vagões e oficinas compunham um sistema técnico exigente — e também o cenário cotidiano de passageiros e trabalhadores." image="/archive/henschel-efbm.webp" />
      <section className="paper-section py-24">
        <div className="museum-container">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTitle kicker="Tecnologia" title="Força, água, carvão e trabalho" />
              <p className="mt-7 leading-8 text-[#685d4f]">Nas locomotivas a vapor, a queima de combustível aquecia água em uma caldeira. O vapor sob pressão movimentava pistões conectados às rodas. Operar a máquina exigia conhecimento, observação contínua e coordenação entre maquinista e foguista.</p>
              <p className="mt-5 leading-8 text-[#685d4f]">A composição podia incluir carros de passageiros, vagões de carga e veículos de serviço. A documentação disponível registra locomotivas de diferentes fabricantes e períodos; cada identificação deve ser feita com base em número, ficha de fábrica ou fotografia legendada.</p>
            </div>
            <figure className="image-frame">
              <img src="/archive/henschel-efbm.webp" alt="Registro lateral de locomotiva Henschel destinada à EFBM" className="h-[430px] w-full bg-[#ddd5c5] object-contain p-5" />
              <figcaption>Registro de fábrica Henschel & Sohn · c. 1939 · Wikimedia Commons</figcaption>
            </figure>
          </div>
          <div className="mt-20 grid gap-8 border-t border-[#a9997e]/35 pt-14 md:grid-cols-3">
            {[
              ['Passageiros', 'As viagens conectavam famílias, feiras e serviços. Horários, esperas e encontros na plataforma faziam parte da experiência ferroviária.'],
              ['Cargas', 'Madeira, café, produtos agrícolas, animais, correspondências e mercadorias diversas circularam em períodos diferentes da operação.'],
              ['Oficinas', 'Manutenção de caldeiras, rodas, freios, trilhos e vagões envolvia equipes especializadas e infraestrutura permanente.'],
            ].map(([title, text], i) => <article key={title}><span className="chapter-number">{i + 1}</span><h3 className="mt-5 font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-[#746857]">{text}</p></article>)}
          </div>
        </div>
      </section>
    </>
  );
}

function Workers() {
  const jobs = [
    ['Maquinistas e foguistas', 'Na cabine, conduziam a composição, controlavam pressão, velocidade, frenagem e alimentação da fornalha.'],
    ['Agentes de estação', 'Organizavam partidas, bilhetes, comunicações, cargas e o funcionamento cotidiano das estações.'],
    ['Turmas de via', 'Inspecionavam trilhos, dormentes, pontes e aterros; um trabalho físico constante e essencial à segurança.'],
    ['Oficinas e manutenção', 'Mecânicos, caldeireiros, carpinteiros e outros ofícios mantinham locomotivas e vagões em serviço.'],
    ['Administração', 'Escrituração, telégrafo, armazéns e planejamento sustentavam a operação para além da linha visível.'],
  ];
  return (
    <>
      <PageHero kicker="História do trabalho" title="As pessoas por trás da ferrovia" intro="Cada viagem dependia de uma rede de saberes. Valorizar a Bahia–Minas é reconhecer os trabalhadores que a construíram, operaram e mantiveram." image="/archive/pojixa.webp" />
      <section className="bg-[#f2ecdf] py-24">
        <div className="museum-container">
          <SectionTitle kicker="Ofícios ferroviários" title="Uma estrada feita por muitas mãos" intro="As funções variavam ao longo do tempo e conforme a administração. O trabalho ferroviário reunia disciplina técnica, esforço físico e conhecimento transmitido entre gerações." />
          <div className="mt-14 border-t border-[#a59478]/40">
            {jobs.map(([title, text], i) => (
              <article key={title} className="grid gap-4 border-b border-[#a59478]/40 py-8 sm:grid-cols-[70px_1fr_1.2fr] sm:items-start">
                <span className="font-mono text-xs text-[#987247]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="text-sm leading-7 text-[#706453]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#293127] py-24 text-white">
        <div className="museum-container grid gap-14 lg:grid-cols-2">
          <SectionTitle light kicker="Memória oral" title="Toda lembrança precisa de contexto" intro="Relatos de antigos ferroviários e familiares são fontes fundamentais, mas devem ser identificados com nome, data, local e autorização." />
          <div className="border border-white/15 p-8 sm:p-10">
            <p className="font-display text-3xl italic leading-snug text-[#d7b27c]">Este portal não atribui falas a pessoas sem documentação.</p>
            <p className="mt-5 text-sm leading-7 text-white/60">Depoimentos publicados futuramente deverão vir de acervos identificados, como o Museu da Pessoa e projetos documentais regionais, com crédito e link para a entrevista original.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Culture() {
  return (
    <>
      <PageHero kicker="Cultura e memória" title="Memórias que atravessam gerações" intro="O apito, a plataforma, a espera e a despedida passaram da experiência cotidiana para as narrativas familiares, a música e a identidade regional." />
      <section className="paper-section py-24">
        <div className="museum-container">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <SectionTitle kicker="Patrimônio imaterial" title="A ferrovia depois dos trilhos" />
              <p className="mt-7 text-lg leading-9 text-[#625647]">A Bahia–Minas permanece na maneira como cidades contam sua própria origem. Está em apelidos, fotografias guardadas, objetos de trabalho, histórias de viagens e na paisagem construída ao redor das antigas estações.</p>
              <p className="mt-5 leading-8 text-[#756958]">A canção “Ponta de Areia”, de Milton Nascimento e Fernando Brant, tornou esse imaginário conhecido em todo o país. Mais que uma referência à desativação, ela transformou a experiência local em memória compartilhada.</p>
            </div>
            <div className="bg-[#884e36] p-9 text-white sm:p-12">
              <span className="text-5xl text-[#d7ae76]">“</span>
              <p className="mt-4 font-display text-4xl italic leading-tight">Ponta de areia, ponto final da Bahia–Minas...</p>
              <p className="mt-8 text-xs uppercase tracking-[.16em] text-white/55">Trecho breve para fins de referência cultural</p>
            </div>
          </div>
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              ['Histórias de família', 'Álbuns, cartas e relatos conectam experiências pessoais à história pública da ferrovia.'],
              ['Identidade das cidades', 'A estação frequentemente se tornou referência espacial, afetiva e simbólica para o município.'],
              ['Música e narrativa', 'Canções, filmes e séries documentais renovam o contato de novas gerações com a estrada.'],
            ].map(([title, text], i) => <article key={title} className="border-t border-[#96764f] pt-6"><span className="font-mono text-xs text-[#9b7547]">0{i + 1}</span><h3 className="mt-6 font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-[#706453]">{text}</p></article>)}
          </div>
        </div>
      </section>
    </>
  );
}

function BeforeAfter() {
  const [value, setValue] = useState(50);
  return (
    <div>
      <div className="compare" style={{ '--position': `${value}%` } as React.CSSProperties}>
        <img src="/archive/mapa-1913.webp" alt="Mapa histórico do Estado da Bahia em 1913" className="compare-base" />
        <div className="compare-overlay"><img src="/archive/ponta-de-areia-atual.webp" alt="Registro contemporâneo de Ponta de Areia" /></div>
        <div className="compare-line" />
        <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} aria-label="Comparar documento de 1913 e registro contemporâneo" />
      </div>
      <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[.15em] text-[#776a58]"><span>Documento · 1913</span><span>Registro contemporâneo</span></div>
      <SourceNote>A comparação é temática, não uma sobreposição do mesmo ponto de vista. Não há fotografia antiga correspondente confirmada no acervo usado nesta versão.</SourceNote>
    </div>
  );
}

function Heritage() {
  return (
    <>
      <PageHero kicker="Preservação" title="Patrimônio histórico" intro="Vestígios materiais tornam visível uma história que também vive em documentos e lembranças. Preservar exige identificar, pesquisar e cuidar." image="/archive/pojixa.webp" />
      <section className="bg-[#eee7d9] py-24">
        <div className="museum-container grid gap-16 lg:grid-cols-2">
          <div>
            <SectionTitle kicker="Vestígios da linha" title="Entre permanência e desaparecimento" />
            <p className="mt-7 leading-8 text-[#6e6252]">Antigas estações, pontes, cortes no terreno, bases de caixa-d’água, oficinas, locomotivas e pequenos objetos formam um patrimônio distribuído. Seu estado varia: há bens restaurados, reutilizados, abandonados ou já desaparecidos.</p>
            <div className="mt-9 grid grid-cols-2 gap-px bg-[#b9aa91]">
              {['Estações', 'Pontes', 'Trilhos', 'Oficinas', 'Locomotivas', 'Documentos'].map((item) => <div key={item} className="bg-[#eee7d9] p-5 font-display text-xl">{item}</div>)}
            </div>
          </div>
          <figure className="image-frame">
            <img src="/archive/pojixa.webp" alt="Locomotiva Pojixá preservada" className="h-[580px] w-full object-cover" />
            <figcaption>Locomotiva Pojixá preservada · registro contemporâneo</figcaption>
          </figure>
        </div>
      </section>
      <section className="paper-section py-24">
        <div className="museum-container">
          <SectionTitle kicker="Passado e presente" title="Comparar sem confundir" intro="Imagens de épocas distintas precisam de legenda, data e contexto. O controle abaixo evidencia essa diferença." />
          <div className="mt-12"><BeforeAfter /></div>
        </div>
      </section>
    </>
  );
}

function Tourism() {
  return (
    <>
      <PageHero kicker="Iniciativa contemporânea" title="Rota Bahia–Minas" intro="Uma experiência turística inspirada na memória da ferrovia — diferente da antiga estrada, mas conectada ao território que ela ajudou a formar." image="/archive/paper-route.webp" />
      <section className="bg-[#f1eadc] py-24">
        <div className="museum-container">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div className="border-l-2 border-[#a66b43] pl-7">
              <p className="font-display text-3xl italic leading-tight text-[#6e4b31]">A Rota não é a reativação da ferrovia.</p>
              <p className="mt-4 text-sm leading-7 text-[#716453]">É uma iniciativa turística contemporânea que ressignifica caminhos, cidades, paisagens e memórias associadas à antiga linha.</p>
            </div>
            <div>
              <SectionTitle kicker="Turismo de memória" title="Um percurso vivido em outro ritmo" />
              <p className="mt-7 leading-8 text-[#6f6352]">Cicloturismo, caminhadas e viagens rodoviárias aproximam visitantes do patrimônio ferroviário, da culinária, das paisagens e da cultura regional. Para que a experiência seja responsável, roteiros devem respeitar propriedades, condições de acesso, comunidades e informações atualizadas.</p>
            </div>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Cicloturismo', 'Longas distâncias e trechos rurais exigem planejamento e apoio local.'],
              ['Paisagem', 'Do litoral aos vales, o percurso atravessa contextos naturais muito diferentes.'],
              ['Gastronomia', 'Sabores locais ajudam a compreender as relações entre território e cultura.'],
              ['Economia local', 'Turismo responsável pode fortalecer guias, hospedagens e pequenos produtores.'],
            ].map(([title, text], i) => <article key={title} className="min-h-[240px] border border-[#ad9b80]/40 p-7"><span className="chapter-number">{i + 1}</span><h3 className="mt-9 font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-6 text-[#716453]">{text}</p></article>)}
          </div>
          <SourceNote>Traçados, serviços, segurança e condições de visitação da rota atual precisam ser confirmados diretamente com os organizadores e municípios antes da viagem.</SourceNote>
        </div>
      </section>
    </>
  );
}

function TimelinePage() {
  const [active, setActive] = useState(0);
  return (
    <>
      <PageHero kicker="Cronologia interativa" title="85 anos em movimento" intro="Acompanhe os principais marcos da ferrovia, das concessões do século XIX ao encerramento das atividades em 1966." image="/archive/mapa-1913.webp" />
      <section className="bg-[#242b22] py-24 text-white">
        <div className="museum-container">
          <div className="overflow-x-auto pb-5">
            <div className="flex min-w-[850px]">
              {timeline.map((item, i) => (
                <button key={item.year} onClick={() => setActive(i)} className={`timeline-marker ${active === i ? 'active' : ''}`}>
                  <span>{item.year}</span><i />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-10 border-t border-white/15 pt-12 lg:grid-cols-[.35fr_.65fr]">
            <div className="font-display text-7xl text-[#cba26e] sm:text-8xl">{timeline[active].year}</div>
            <div>
              <p className="eyebrow">Marco {String(active + 1).padStart(2, '0')}</p>
              <h2 className="mt-4 font-display text-5xl">{timeline[active].title}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{timeline[active].text}</p>
              <div className="mt-9 flex gap-2">
                <button onClick={() => setActive((active - 1 + timeline.length) % timeline.length)} className="square-button" aria-label="Marco anterior"><Arrow direction="left" /></button>
                <button onClick={() => setActive((active + 1) % timeline.length)} className="square-button" aria-label="Próximo marco"><Arrow /></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryModal({ item, close }: { item: GalleryItem; close: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#10130f]/95 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={item.title}>
      <button onClick={close} className="absolute right-5 top-5 icon-button text-white" aria-label="Fechar imagem"><Icon name="close" /></button>
      <div className="grid max-h-full w-full max-w-6xl overflow-auto bg-[#eee7d9] lg:grid-cols-[1.4fr_.6fr]">
        <img src={item.src} alt={item.title} className={`h-full min-h-[350px] max-h-[80vh] w-full object-cover ${item.object || ''}`} />
        <div className="p-7 sm:p-10">
          <p className="eyebrow !text-[#8b6840]">{item.category}</p>
          <h2 className="mt-4 font-display text-4xl">{item.title}</h2>
          <dl className="mt-8 grid gap-5 text-sm">
            <div><dt className="text-xs uppercase tracking-widest text-[#8b7c67]">Data</dt><dd className="mt-1">{item.date}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-[#8b7c67]">Local</dt><dd className="mt-1">{item.place}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-[#8b7c67]">Crédito</dt><dd className="mt-1">{item.credit}</dd></div>
          </dl>
          <p className="mt-8 text-sm leading-7 text-[#6e6252]">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const categories = ['Todos', ...Array.from(new Set(gallery.map((item) => item.category)))];
  const items = filter === 'Todos' ? gallery : gallery.filter((item) => item.category === filter);
  return (
    <>
      <PageHero kicker="Acervo visual" title="Galeria histórica" intro="Imagens, mapas e registros identificados. Cada item informa o que é histórico, contemporâneo ou interpretativo." image="/archive/mapa-1913.webp" />
      <section className="bg-[#eee7d9] py-20">
        <div className="museum-container">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar galeria">
            {categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={`filter-button ${filter === category ? 'active' : ''}`}>{category}</button>)}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <button key={item.title} onClick={() => setSelected(item)} className={`gallery-card ${i === 0 && filter === 'Todos' ? 'md:col-span-2' : ''}`}>
                <img src={item.src} alt="" className={`h-[330px] w-full object-cover transition duration-700 group-hover:scale-105 ${item.object || ''}`} loading="lazy" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
                  <span className="text-[10px] uppercase tracking-[.16em] text-[#dab47e]">{item.category} · {item.date}</span>
                  <strong className="mt-2 block font-display text-2xl font-normal">{item.title}</strong>
                  <span className="mt-2 block text-xs text-white/55">{item.credit}</span>
                </span>
                <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black/35 text-white backdrop-blur"><Icon name="expand" /></span>
              </button>
            ))}
          </div>
          <SourceNote>Não há fotografias modernas apresentadas como históricas. A datação “c.” indica aproximação; “registro contemporâneo” identifica imagens feitas após o encerramento.</SourceNote>
        </div>
      </section>
      {selected && <GalleryModal item={selected} close={() => setSelected(null)} />}
    </>
  );
}

function Facts() {
  const facts = [
    ['Por que Bahia–Minas?', 'Porque a linha ligava o litoral sul da Bahia ao nordeste de Minas Gerais. O nome resume os dois territórios conectados pela estrada.'],
    ['Qual era a extensão?', 'A bibliografia de síntese cita aproximadamente 578 quilômetros entre Ponta de Areia e Araçuaí. Medidas podem variar conforme o período e o critério adotado.'],
    ['O que era transportado?', 'Passageiros, correspondências, madeira, produtos agrícolas, animais e outras mercadorias circularam pela linha em momentos distintos.'],
    ['Como eram as viagens?', 'O trem organizava horários e encontros, mas as viagens podiam ser longas e sujeitas às condições da via, da máquina e do clima.'],
    ['Por que foi importante?', 'A ferrovia reduziu o isolamento relativo de comunidades, articulou mercados e participou da formação econômica e urbana do Vale do Mucuri.'],
    ['Quando foi encerrada?', 'As atividades terminaram em 1966. O processo integrou uma política nacional de supressão de ramais considerados deficitários.'],
    ['A linha chegou a Araçuaí?', 'Sim. A expansão alcançou Araçuaí em 1942, tornando a cidade o terminal mineiro da ferrovia.'],
    ['A Rota atual é uma ferrovia?', 'Não. A Rota Bahia–Minas é uma iniciativa turística contemporânea inspirada no território e na memória da antiga linha.'],
  ];
  return (
    <>
      <PageHero kicker="Perguntas frequentes" title="Curiosidades da Bahia–Minas" intro="Respostas diretas para compreender a linha, sua operação e o legado que permanece." />
      <section className="paper-section py-24">
        <div className="museum-container max-w-5xl">
          {facts.map(([q, a], i) => (
            <details key={q} className="faq group">
              <summary><span className="font-mono text-xs text-[#986f43]">{String(i + 1).padStart(2, '0')}</span><span className="font-display text-2xl sm:text-3xl">{q}</span><span className="ml-auto text-2xl font-light group-open:rotate-45">＋</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <PageHero kicker="Sobre o projeto" title="Preservar é tornar acessível" intro="Este museu digital organiza uma narrativa introdutória sobre a EFBM e explicita as fontes, limites e escolhas de cada conteúdo." />
      <section className="bg-[#eee7d9] py-24">
        <div className="museum-container">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <SectionTitle kicker="Missão" title="Memória regional para novas gerações" />
            <div className="space-y-6 text-lg leading-9 text-[#665a4b]">
              <p>O projeto busca valorizar a história ferroviária como patrimônio compartilhado. Sua proposta é aproximar documentos, paisagens e histórias de trabalho sem transformar lacunas de pesquisa em afirmações.</p>
              <p>Esta versão é uma curadoria digital introdutória. Informações de estações, datas e acervo devem continuar sendo confrontadas com documentação primária, inventários locais e pesquisa acadêmica.</p>
            </div>
          </div>
          <div className="mt-20">
            <SectionTitle kicker="Fontes e referências" title="Onde esta pesquisa começa" intro="Links institucionais e acervos utilizados como orientação. Cada imagem da galeria traz crédito próprio." />
            <div className="mt-10 grid gap-px bg-[#b8a78c] sm:grid-cols-2">
              {sources.map((source) => (
                <a key={source.name} href={source.url} target="_blank" rel="noreferrer" className="group bg-[#eee7d9] p-7 hover:bg-[#e5dbc9]">
                  <span className="flex items-start justify-between gap-5"><strong className="font-display text-2xl font-normal">{source.name}</strong><Arrow /></span>
                  <span className="mt-3 block text-sm leading-6 text-[#776a59]">{source.note}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 border border-[#9f8d71]/40 p-8 sm:p-12">
            <h3 className="font-display text-3xl">Política de confiabilidade</h3>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-[#706352]">Não publicamos depoimentos sem autoria, posições geográficas inventadas ou imagens contemporâneas como registros de época. Informações ainda não confirmadas são tratadas como pesquisa complementar. O mapa interativo desta versão é esquemático e não substitui cartografia técnica.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const getPage = () => {
    const hash = window.location.hash.replace('#', '') as PageId;
    return pages.some((page) => page.id === hash) ? hash : 'inicio';
  };
  const [page, setPage] = useState<PageId>(getPage);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onHash = () => setPage(getPage());
    const onScroll = () => setShowTop(window.scrollY > 650);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const label = pages.find((item) => item.id === page)?.label;
    document.title = `${label} | Museu Digital Bahia–Minas`;
    const meta = document.querySelector('meta[name="description"]') || document.head.appendChild(document.createElement('meta'));
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', 'Museu digital dedicado à história, ao patrimônio e à memória da Estrada de Ferro Bahia e Minas.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const navigate: Navigate = (id) => {
    if (id === page) window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigateTo(id);
  };

  const content: Record<PageId, React.ReactNode> = {
    inicio: <Home navigate={navigate} />,
    historia: <History />,
    trajeto: <RoutePage />,
    locomotivas: <Locomotives />,
    trabalhadores: <Workers />,
    cultura: <Culture />,
    patrimonio: <Heritage />,
    rota: <Tourism />,
    'linha-do-tempo': <TimelinePage />,
    galeria: <Gallery />,
    curiosidades: <Facts />,
    sobre: <About />,
  };

  return (
    <div className="min-h-screen bg-[#eee7d9] text-[#302a22]">
      <Header page={page} navigate={navigate} />
      <main id="conteudo">{content[page]}</main>
      <Footer navigate={navigate} />
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`back-top ${showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`} aria-label="Voltar ao topo"><Arrow direction="up" /></button>
    </div>
  );
}

export default App;
