import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Check,
  ChevronRight,
  CircleCheck,
  Globe2,
  Headphones,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  Warehouse,
  X,
} from 'lucide-react';
import { Route as WouterRoute, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();
const WHATSAPP_URL = 'https://wa.me/15550147862';
const HERO_IMAGE = 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=2200';
const COMPLEX_LOGISTICS_IMAGE = 'https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1600';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Contact', href: '#contact' },
];

const serviceItems = [
  {
    number: '01',
    icon: Truck,
    title: 'Transportation',
    short: 'The right mode, on the right day.',
    description: 'Road, air, ocean, and rail movements coordinated around your delivery promise — with one team accountable for every handoff.',
    tag: 'FTL / LTL / AIR / OCEAN',
    detail: 'Lane planning, carrier procurement, live milestone updates, and exception response.',
  },
  {
    number: '02',
    icon: Route,
    title: 'Logistics',
    short: 'One view across the moving parts.',
    description: 'A calm control layer for complex freight, documentation, customs coordination, and the decisions that keep your operation moving.',
    tag: 'CONTROL TOWER',
    detail: 'Origin-to-destination coordination with clear ownership and a single source of truth.',
  },
  {
    number: '03',
    icon: Warehouse,
    title: 'Warehousing',
    short: 'Space that works harder.',
    description: 'Flexible storage and fulfillment designed for changing demand, from cross-dock programs to careful inventory handling.',
    tag: 'STORAGE / FULFILLMENT',
    detail: 'Inbound receiving, kitting, pick-and-pack, inventory counts, and outbound staging.',
  },
  {
    number: '04',
    icon: PackageCheck,
    title: 'Courier & Delivery',
    short: 'For the shipment that cannot wait.',
    description: 'Time-critical final mile delivery for samples, documents, spare parts, and high-priority cargo.',
    tag: 'SAME DAY / NEXT DAY',
    detail: 'Local dispatch, proof of delivery, scheduled routes, and direct-to-site service.',
  },
  {
    number: '05',
    icon: Boxes,
    title: 'Commodity Trading',
    short: 'Move value with context.',
    description: 'Market-aware support for sourcing, documentation, and the physical movement of traded goods across borders.',
    tag: 'SOURCING / TRADE',
    detail: 'Practical coordination across suppliers, buyers, ports, and required paperwork.',
  },
  {
    number: '06',
    icon: Sparkles,
    title: 'Custom Solutions',
    short: 'A network shaped around yours.',
    description: 'When a standard lane does not fit, we build an operating model that does — from launch programs to recurring specialist freight.',
    tag: 'BESPOKE PROGRAMS',
    detail: 'Network design, project cargo, process mapping, and dedicated operating support.',
  },
];

const solutionItems = [
  { title: 'Industrial supply chains', copy: 'Keep production moving with scheduled inbound freight, plant-ready delivery, and fast exception handling.', icon: Building2, label: 'MANUFACTURING' },
  { title: 'Retail & distribution', copy: 'Flex with seasonal volume, multiple destinations, and the details that sit between a supplier and a shelf.', icon: Landmark, label: 'DISTRIBUTION' },
  { title: 'High-value cargo', copy: 'Add chain-of-custody, secure handling, and documentation for goods that deserve more than a tracking number.', icon: ShieldCheck, label: 'SPECIALIST FREIGHT' },
];

const helpOptions = [
  { label: 'Transportation', icon: Truck, copy: 'Road, air, ocean, and rail freight' },
  { label: 'Warehousing', icon: Warehouse, copy: 'Storage, fulfillment, and inventory' },
  { label: 'Logistics', icon: Route, copy: 'End-to-end planning and coordination' },
  { label: 'Other Inquiry', icon: MessageCircle, copy: 'Something more specific' },
];

type AssistantMessage = { from: 'assistant' | 'user'; text: string };

function scrollToInquiry(service?: string, onSelect?: (value: string) => void) {
  if (service && onSelect) onSelect(service);
  window.setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
}

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#home" className="group flex items-center gap-3" data-testid="link-logo">
      <span className={`relative flex h-10 w-10 items-center justify-center transition-colors ${inverted ? 'bg-[#f4ad2d] text-[#172f43]' : 'bg-[#172f43] text-[#f4ad2d]'}`}>
        <span className={`absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 ${inverted ? 'border-[#172f43]' : 'border-[#f4ad2d]'}`} />
        <span className={`absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 ${inverted ? 'border-[#172f43]' : 'border-[#f4ad2d]'}`} />
        <Route size={21} strokeWidth={2.7} />
      </span>
      <span>
        <span className={`block font-semibold leading-none tracking-[0.18em] transition-colors ${inverted ? 'text-[#172f43]' : 'text-[#f2f4ee]'}`}>NORTHSTAR</span>
        <span className={`mono-label mt-1 block text-[9px] ${inverted ? 'text-[#2d827a]' : 'text-[#f4ad2d]'}`}>LOGISTICS GROUP</span>
      </span>
    </a>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const inverted = !scrolled;
  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${scrolled ? 'border-[#d8d3c9]/80 bg-[#f4f2eb]/90 text-[#172f43] shadow-[0_8px_28px_rgba(23,47,67,.08)] backdrop-blur-xl' : 'border-white/15 bg-[#172f43]/10 text-[#f2f4ee] backdrop-blur-[3px]'}`} data-testid="header-main">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Logo inverted={inverted} />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={`text-[13px] font-semibold transition-colors ${scrolled ? 'text-[#172f43]/65 hover:text-[#2d827a]' : 'text-[#f2f4ee]/75 hover:text-[#f4ad2d]'}`} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-[13px] font-semibold transition-colors ${scrolled ? 'text-[#172f43]/65 hover:text-[#2d827a]' : 'text-[#f2f4ee]/75 hover:text-[#f4ad2d]'}`} data-testid="link-header-whatsapp">
            <MessageCircle size={15} /> WhatsApp
          </a>
          <button onClick={() => scrollToInquiry()} className="flex items-center gap-2 bg-[#f4ad2d] px-4 py-2.5 text-[13px] font-bold text-[#172f43] transition-colors hover:bg-[#ffd06c]" data-testid="button-header-quote">
            Get a Quote <ArrowUpRight size={16} />
          </button>
        </div>
        <button onClick={() => setMobileOpen((open) => !open)} className={`md:hidden ${scrolled ? 'text-[#172f43]' : 'text-[#f2f4ee]'}`} aria-label="Toggle menu" data-testid="button-mobile-menu">
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-[#d8d3c9]/70 bg-[#f4f2eb] px-5 pb-6 pt-2 text-[#172f43] md:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="border-b border-[#d8d3c9] py-4 text-sm font-semibold" data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <button onClick={() => { setMobileOpen(false); scrollToInquiry(); }} className="mt-5 flex w-full items-center justify-center gap-2 bg-[#f4ad2d] px-4 py-3 text-sm font-bold text-[#172f43]" data-testid="button-mobile-quote">
            Get a Quote <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mono-label flex items-center gap-3 text-[10px] ${light ? 'text-[#f4ad2d]' : 'text-[#2d827a]'}`}>
      <span className={`h-2 w-2 ${light ? 'bg-[#f4ad2d]' : 'bg-[#2d827a]'}`} /> {children}
    </p>
  );
}

function Hero({ onSelectService }: { onSelectService: (value: string) => void }) {
  return (
    <section id="home" className="relative flex min-h-[770px] items-end overflow-hidden bg-[#172f43] pt-28 text-[#f2f4ee] lg:min-h-[850px]">
      <img src={HERO_IMAGE} alt="Container ship carrying freight through a busy harbor" className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-luminosity" data-testid="img-hero-logistics" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#172f43_3%,rgba(23,47,67,.9)_40%,rgba(23,47,67,.25)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(23,47,67,.88),transparent_55%)]" />
      <div className="absolute right-0 top-0 hidden h-full w-[35%] border-l border-white/15 lg:block" />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-10 lg:pb-20">
        <div className="max-w-[780px] reveal">
          <Eyebrow light>International freight / since 1994</Eyebrow>
          <h1 className="display-font mt-7 max-w-4xl text-[4.7rem] font-semibold uppercase leading-[0.82] tracking-[-0.065em] text-[#f2f4ee] sm:text-[6.6rem] lg:text-[9.3rem]">
            Moving Your<br /><span className="text-[#f4ad2d]">Business Forward.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#f2f4ee]/75 sm:text-xl">
            Reliable transportation, logistics and warehousing solutions designed for modern businesses.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <button onClick={() => scrollToInquiry()} className="group flex items-center gap-3 bg-[#f4ad2d] px-6 py-4 text-sm font-bold text-[#172f43] transition-colors hover:bg-[#ffd06c]" data-testid="button-hero-quote">
              Get a Quote <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <a href="#services" className="flex items-center gap-2 text-sm font-semibold text-[#f2f4ee] transition-colors hover:text-[#f4ad2d]" data-testid="link-hero-services">
              Explore services <ChevronRight size={17} />
            </a>
          </div>
        </div>
        <div className="mt-16 grid max-w-[820px] grid-cols-2 gap-y-7 border-t border-white/20 pt-6 sm:grid-cols-4 reveal reveal-delay-2">
          {[
            ['18', 'countries served'],
            ['24/7', 'control tower'],
            ['98.4%', 'on-time delivery'],
            ['31 yrs', 'moving business'],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="display-font text-3xl text-[#f4ad2d]">{stat}</p>
              <p className="mono-label mt-1 text-[9px] text-[#f2f4ee]/50">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 right-8 hidden items-center gap-3 lg:flex">
        <span className="mono-label text-[10px] text-[#f2f4ee]/45">SCROLL TO DISCOVER</span>
        <ArrowDownRight size={17} className="text-[#f4ad2d]" />
      </div>
      <HelpSelector onSelect={onSelectService} />
    </section>
  );
}

function HelpSelector({ onSelect }: { onSelect: (value: string) => void }) {
  return (
    <div className="help-selector relative z-10 mx-5 mb-5 mt-12 w-auto border border-[#f2f4ee]/25 bg-[#f2f4ee]/10 p-4 backdrop-blur-md sm:mx-8 lg:absolute lg:bottom-12 lg:right-10 lg:mb-0 lg:mt-0 lg:w-[315px]" data-testid="card-help-selector">
      <div className="flex items-center justify-between border-b border-white/20 pb-3">
        <p className="text-sm font-bold text-[#f2f4ee]">What do you need help with?</p>
        <Sparkles size={16} className="text-[#f4ad2d]" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {helpOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button key={option.label} onClick={() => scrollToInquiry(option.label, onSelect)} className="group border border-white/15 bg-[#172f43]/45 p-3 text-left transition-colors hover:border-[#f4ad2d] hover:bg-[#172f43]/75" data-testid={`button-help-${option.label.toLowerCase().replaceAll(' ', '-')}`}>
              <Icon size={17} className="text-[#f4ad2d]" />
              <span className="mt-3 block text-xs font-bold text-[#f2f4ee]">{option.label}</span>
              <span className="mt-1 block text-[10px] leading-snug text-[#f2f4ee]/55">{option.copy}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-[#d8d3c9] bg-[#e8e5dc]" aria-label="Trust indicators">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:px-10">
        <p className="mono-label text-[10px] text-[#597080]">Trusted to keep business moving</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-[#172f43]/60" data-testid="list-trusted-clients">
          <span>Helio Manufacturing</span><span>OAK &amp; IRON</span><span>Vantage Medical</span><span>Maritime North</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  const principles = [
    { title: 'Mission', text: 'Make global movement feel local, legible, and dependable for every business we serve.' },
    { title: 'Vision', text: 'A more resilient world of trade, where the next handoff is never a blind spot.' },
    { title: 'Approach', text: 'Stay curious, communicate early, and own the outcome beyond the booking.' },
  ];
  return (
    <section id="about" className="paper-grid bg-[#f4f2eb] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
        <div>
          <Eyebrow>01 / About Northstar</Eyebrow>
          <h2 className="display-font mt-7 text-6xl font-semibold uppercase leading-[0.87] text-[#172f43] sm:text-7xl lg:text-[7.5rem]">More than<br /><span className="text-[#2d827a]">mileage.</span></h2>
          <div className="mt-12 flex items-center gap-4 border-t border-[#cfc9bd] pt-5">
            <div className="flex h-12 w-12 items-center justify-center bg-[#172f43] text-[#f4ad2d]"><Globe2 size={22} /></div>
            <p className="max-w-xs text-sm leading-relaxed text-[#597080]">One accountable partner from first mile to final delivery.</p>
          </div>
        </div>
        <div className="lg:pt-16">
          <p className="max-w-2xl text-2xl leading-snug text-[#172f43] sm:text-3xl">We make complex movement feel straightforward. Northstar connects people, cargo, and critical timelines across a single, visible network.</p>
          <p className="mt-7 max-w-xl leading-relaxed text-[#597080]">From a pallet leaving Monterrey to a priority part landing in Rotterdam, our teams coordinate the details behind the scenes so your operation can stay focused on what is next. We pair local judgment with international reach — and answer the phone when the plan changes.</p>
          <div className="mt-10 grid gap-5 border-t border-[#cfc9bd] pt-7 sm:grid-cols-3">
            {principles.map((item) => (
              <div key={item.title} className="border-l-2 border-[#f4ad2d] pl-4">
                <p className="mono-label text-[10px] text-[#2d827a]">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#597080]">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-7 border-t border-[#cfc9bd] pt-7">
            <div><p className="display-font text-5xl text-[#172f43]">04</p><p className="mono-label mt-2 text-[10px] text-[#597080]">INTERNATIONAL HUBS</p></div>
            <div><p className="display-font text-5xl text-[#172f43]">1,260</p><p className="mono-label mt-2 text-[10px] text-[#597080]">LOCAL CARRIER PARTNERS</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ onSelectService }: { onSelectService: (value: string) => void }) {
  const [activeService, setActiveService] = useState(serviceItems[0].title);
  const active = serviceItems.find((service) => service.title === activeService) ?? serviceItems[0];
  return (
    <section id="services" className="bg-[#172f43] px-5 py-24 text-[#f2f4ee] sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow light>02 / Capabilities</Eyebrow>
            <h2 className="display-font mt-6 max-w-2xl text-6xl font-semibold uppercase leading-[0.88] sm:text-7xl lg:text-[7.2rem]">Built around<br /><span className="text-[#f4ad2d]">your cargo.</span></h2>
          </div>
          <p className="max-w-sm leading-relaxed text-[#f2f4ee]/60">A precise service for every leg, backed by people who understand what a delay really costs.</p>
        </div>
        <div className="mt-16 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-12">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === service.title;
            return (
              <button key={service.number} onClick={() => setActiveService(service.title)} className={`group border-b border-white/15 p-5 text-left transition-colors sm:p-7 lg:col-span-4 ${index === 0 ? 'lg:col-span-5' : index === 1 ? 'lg:col-span-7' : ''} ${isActive ? 'bg-[#21465a]' : 'hover:bg-[#1d3d52]'}`} data-testid={`button-service-${service.title.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="flex items-start justify-between">
                  <Icon size={28} strokeWidth={1.5} className={isActive ? 'text-[#f4ad2d]' : 'text-[#f2f4ee]/60'} />
                  <span className="mono-label text-[10px] text-[#f2f4ee]/40">{service.number}</span>
                </div>
                <h3 className="display-font mt-14 text-4xl uppercase leading-none">{service.title}</h3>
                <p className="mt-3 text-sm font-semibold text-[#f4ad2d]">{service.short}</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f2f4ee]/58">{service.description}</p>
                <div className="mt-7 flex items-center justify-between gap-3">
                  <p className="mono-label text-[9px] text-[#f4ad2d]">{service.tag}</p>
                  <ArrowUpRight size={18} className={`text-[#f4ad2d] transition-transform ${isActive ? '-translate-y-1 translate-x-1' : 'group-hover:-translate-y-1 group-hover:translate-x-1'}`} />
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-col justify-between gap-5 border-l-2 border-[#f4ad2d] bg-[#21465a] p-5 sm:flex-row sm:items-center sm:p-6" data-testid="panel-active-service">
          <div><p className="mono-label text-[9px] text-[#f4ad2d]">SELECTED SERVICE / {active.number}</p><p className="mt-2 text-sm text-[#f2f4ee]/75">{active.detail}</p></div>
          <button onClick={() => { onSelectService(active.title); scrollToInquiry(active.title, onSelectService); }} className="flex shrink-0 items-center gap-2 self-start text-sm font-bold text-[#f4ad2d] hover:text-[#ffd06c] sm:self-center" data-testid="button-service-inquiry">
            Discuss this service <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function FeaturedSolutions() {
  return (
    <section className="bg-[#e8e5dc] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <div className="image-sheen relative min-h-[430px] overflow-hidden bg-[#2d827a]">
          <img src={COMPLEX_LOGISTICS_IMAGE} alt="Warehouse team preparing freight for a complex logistics route" className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity" data-testid="img-complex-logistics" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/35 pt-4 text-[#f2f4ee]">
            <p className="mono-label text-[9px]">CASE FILE / 024</p>
            <p className="text-xs font-semibold">Global industrial network</p>
          </div>
        </div>
        <div id="solutions">
          <Eyebrow>03 / Featured solution</Eyebrow>
          <h2 className="display-font mt-7 text-6xl font-semibold uppercase leading-[0.88] text-[#172f43] sm:text-7xl lg:text-[6.6rem]">Built for<br /><span className="text-[#2d827a]">complex logistics.</span></h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#597080]">When a supply chain has more variables than a spreadsheet can hold, we give it structure — and give your team room to think.</p>
          <div className="mt-9 grid gap-x-7 gap-y-5 border-t border-[#cfc9bd] pt-6 sm:grid-cols-2">
            {['Multi-modal routing', 'Custom SOPs & reporting', 'Supplier coordination', 'Exception response desk'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#172f43]"><Check size={17} className="text-[#2d827a]" /> {item}</div>
            ))}
          </div>
          <a href="#contact" className="mt-10 inline-flex items-center gap-3 border-b-2 border-[#f4ad2d] pb-2 text-sm font-bold text-[#172f43] transition-colors hover:text-[#2d827a]" data-testid="link-solutions-contact">
            Design your route <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section className="bg-[#f4f2eb] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <div>
          <Eyebrow>Sector intelligence</Eyebrow>
          <h2 className="display-font mt-7 text-6xl font-semibold uppercase leading-[0.88] text-[#172f43] sm:text-7xl lg:text-[6.7rem]">The right<br /><span className="text-[#2d827a]">fit.</span></h2>
          <p className="mt-8 max-w-sm leading-relaxed text-[#597080]">Your industry has its own pressure points. Our operating model adapts around them — not the other way around.</p>
          <a href="#contact" className="mt-9 inline-flex items-center gap-3 border-b-2 border-[#f4ad2d] pb-2 text-sm font-bold text-[#172f43] transition-colors hover:text-[#2d827a]" data-testid="link-sector-contact">Discuss your network <ArrowUpRight size={16} /></a>
        </div>
        <div className="space-y-3">
          {solutionItems.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div key={solution.title} className="group grid gap-5 border-t border-[#cfc9bd] py-7 sm:grid-cols-[52px_1fr_auto] sm:items-center" data-testid={`row-solution-${index}`}>
                <div className="flex h-11 w-11 items-center justify-center bg-[#172f43] text-[#f4ad2d]"><Icon size={20} /></div>
                <div><p className="mono-label text-[9px] text-[#597080]">0{index + 1} / {solution.label}</p><h3 className="mt-2 text-xl font-semibold text-[#172f43]">{solution.title}</h3><p className="mt-2 max-w-lg text-sm leading-relaxed text-[#597080]">{solution.copy}</p></div>
                <ArrowUpRight size={21} className="text-[#2d827a] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: '01', title: 'Tell us the shape of it', copy: 'Share the cargo, route, timing, and constraints. We ask the questions that matter before recommending a mode.' },
    { number: '02', title: 'Get a clear route plan', copy: 'Your specialist maps the movement, partners, milestones, and cost structure — without hiding the moving parts.' },
    { number: '03', title: 'Move with one team', copy: 'We coordinate the handoffs and stay close through delivery, with proactive updates when the plan changes.' },
  ];
  return (
    <section className="blueprint-grid bg-[#2d827a] px-5 py-24 text-[#f2f4ee] sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div><p className="mono-label text-[10px] text-[#f4d891]">04 / How it works</p><h2 className="display-font mt-7 text-6xl font-semibold uppercase leading-[0.87] sm:text-7xl lg:text-[7.3rem]">From brief<br /><span className="text-[#f4d891]">to delivered.</span></h2></div>
          <p className="max-w-sm text-lg leading-relaxed text-[#f2f4ee]/72">Clear at the start. Present at the end. No black box in between.</p>
        </div>
        <div className="relative mt-16 grid gap-10 border-t border-white/25 pt-10 lg:grid-cols-3 lg:gap-0 lg:border-t-0 lg:pt-0">
          <div className="absolute left-[12%] right-[12%] top-[45px] hidden h-px bg-[#f4d891]/60 lg:block" />
          {steps.map((step) => (
            <article key={step.number} className="relative border-l border-white/25 pl-5 lg:border-l-0 lg:pl-0 lg:pr-14" data-testid={`step-how-it-works-${step.number}`}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center bg-[#f4ad2d] text-[#172f43]"><span className="mono-label text-[10px]">{step.number}</span></div>
              <h3 className="display-font mt-8 max-w-xs text-4xl uppercase leading-none">{step.title}</h3>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#f2f4ee]/65">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm({ selectedService, onServiceChange }: { selectedService: string; onServiceChange: (value: string) => void }) {
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
    onServiceChange('Transportation');
  }
  return (
    <section id="contact" className="bg-[#f4f2eb] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-28">
        <div>
          <Eyebrow>05 / Start a conversation</Eyebrow>
          <h2 className="display-font mt-7 text-6xl font-semibold uppercase leading-[0.87] text-[#172f43] sm:text-7xl lg:text-[6.5rem]">Let's move<br /><span className="text-[#f4ad2d]">forward.</span></h2>
          <p className="mt-8 max-w-sm leading-relaxed text-[#597080]">Tell us what is moving, where it needs to go, and what is at stake. A Northstar specialist will be in touch within one business day.</p>
          <div className="mt-12 space-y-5 border-t border-[#cfc9bd] pt-6 text-sm text-[#172f43]">
            <a href="mailto:hello@northstarlogistics.example" className="flex items-center gap-3 transition-colors hover:text-[#2d827a]" data-testid="link-contact-email"><Mail size={17} className="text-[#2d827a]" /> hello@northstarlogistics.example</a>
            <a href="tel:+15550147862" className="flex items-center gap-3 transition-colors hover:text-[#2d827a]" data-testid="link-contact-phone"><Phone size={17} className="text-[#2d827a]" /> +1 555 014 7862</a>
            <p className="flex items-center gap-3"><MapPin size={17} className="text-[#2d827a]" /> 88 Harbor Exchange, Seattle, WA</p>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-3 bg-[#d7ebe5] px-4 py-3 text-sm font-bold text-[#172f43] transition-colors hover:bg-[#c6e2db]" data-testid="link-contact-whatsapp"><MessageCircle size={18} className="text-[#2d827a]" /> Prefer WhatsApp? Start there.</a>
        </div>
        <div className="bg-[#e8e5dc] p-6 sm:p-10">
          {sent && (
            <div className="mb-7 flex items-start gap-3 border border-[#2d827a]/30 bg-[#d7ebe5] p-4 text-sm text-[#172f43]" role="status" data-testid="status-inquiry-success">
              <CircleCheck size={20} className="shrink-0 text-[#2d827a]" />
              <div><p className="font-bold">Inquiry received.</p><p className="mt-1 text-[#597080]">Thanks — our team will review the route and be in touch shortly.</p></div>
              <button onClick={() => setSent(false)} className="ml-auto text-[#597080] hover:text-[#172f43]" aria-label="Dismiss success message" data-testid="button-dismiss-success"><X size={16} /></button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2" data-testid="form-inquiry">
            <div className="sm:col-span-2"><label htmlFor="name" className="mono-label text-[10px] text-[#597080]">YOUR NAME *</label><input id="name" name="name" required placeholder="Avery Morgan" className="mt-2 w-full border-0 border-b border-[#bdb6a9] bg-transparent px-0 py-3 text-[#172f43] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-name" /></div>
            <div><label htmlFor="company" className="mono-label text-[10px] text-[#597080]">COMPANY *</label><input id="company" name="company" required placeholder="Company name" className="mt-2 w-full border-0 border-b border-[#bdb6a9] bg-transparent px-0 py-3 text-[#172f43] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-company" /></div>
            <div><label htmlFor="email" className="mono-label text-[10px] text-[#597080]">WORK EMAIL *</label><input id="email" name="email" type="email" required placeholder="you@company.com" className="mt-2 w-full border-0 border-b border-[#bdb6a9] bg-transparent px-0 py-3 text-[#172f43] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-email" /></div>
            <div><label htmlFor="service" className="mono-label text-[10px] text-[#597080]">SERVICE NEEDED *</label><select id="service" name="service" required value={selectedService} onChange={(event) => onServiceChange(event.target.value)} className="mt-2 w-full border-0 border-b border-[#bdb6a9] bg-transparent px-0 py-3 text-[#172f43] outline-none focus:border-[#2d827a]" data-testid="select-inquiry-service">{helpOptions.map((option) => <option key={option.label} value={option.label}>{option.label}</option>)}</select></div>
            <div><label htmlFor="origin" className="mono-label text-[10px] text-[#597080]">ORIGIN</label><input id="origin" name="origin" placeholder="City / country" className="mt-2 w-full border-0 border-b border-[#bdb6a9] bg-transparent px-0 py-3 text-[#172f43] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-origin" /></div>
            <div><label htmlFor="destination" className="mono-label text-[10px] text-[#597080]">DESTINATION</label><input id="destination" name="destination" placeholder="City / country" className="mt-2 w-full border-0 border-b border-[#bdb6a9] bg-transparent px-0 py-3 text-[#172f43] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-destination" /></div>
            <div className="sm:col-span-2"><label htmlFor="message" className="mono-label text-[10px] text-[#597080]">WHAT ARE YOU MOVING?</label><textarea id="message" name="message" rows={3} placeholder="Cargo type, timing, special requirements..." className="mt-2 w-full resize-none border-0 border-b border-[#bdb6a9] bg-transparent px-0 py-3 text-[#172f43] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="textarea-inquiry-message" /></div>
            <div className="flex items-center justify-between gap-5 pt-2 sm:col-span-2"><p className="max-w-xs text-xs leading-relaxed text-[#597080]">By submitting, you agree to be contacted about this request.</p><button type="submit" className="flex shrink-0 items-center gap-3 bg-[#172f43] px-5 py-3.5 text-sm font-bold text-[#f2f4ee] transition-colors hover:bg-[#2d827a]" data-testid="button-submit-inquiry">Send inquiry <Send size={16} /></button></div>
          </form>
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="bg-[#f4ad2d] px-5 py-16 text-[#172f43] sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div><p className="mono-label text-[10px] text-[#172f43]/60">The next handoff starts here</p><h2 className="display-font mt-4 max-w-3xl text-5xl font-semibold uppercase leading-[0.9] sm:text-6xl lg:text-[6.6rem]">Have a route in mind?</h2></div>
        <button onClick={() => scrollToInquiry()} className="group flex shrink-0 items-center gap-3 bg-[#172f43] px-6 py-4 text-sm font-bold text-[#f2f4ee] transition-colors hover:bg-[#2d827a]" data-testid="button-cta-quote">Get a Quote <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#172f43] px-5 py-12 text-[#f2f4ee] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 border-b border-white/15 pb-12 md:grid-cols-[1fr_auto_auto] md:items-end">
        <div><Logo /><p className="mt-6 max-w-xs text-sm leading-relaxed text-[#f2f4ee]/55">Freight that keeps its word. Transportation and supply chain solutions built for the real world.</p></div>
        <div><p className="mono-label mb-4 text-[9px] text-[#f4ad2d]">EXPLORE</p><div className="flex flex-col gap-3 text-sm text-[#f2f4ee]/65">{navItems.slice(1).map((item) => <a key={item.href} href={item.href} className="transition-colors hover:text-[#f4ad2d]" data-testid={`link-footer-${item.label.toLowerCase()}`}>{item.label}</a>)}</div></div>
        <div><p className="mono-label mb-4 text-[9px] text-[#f4ad2d]">CONNECT</p><div className="flex flex-col gap-3 text-sm text-[#f2f4ee]/65"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#f4ad2d]" data-testid="link-footer-whatsapp">WhatsApp desk</a><a href="mailto:hello@northstarlogistics.example" className="transition-colors hover:text-[#f4ad2d]" data-testid="link-footer-email">Email the team</a></div></div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 pt-6 text-[10px] text-[#f2f4ee]/35 sm:flex-row"><span>© 2025 Northstar Logistics Group</span><span className="mono-label text-[9px]">BUILT FOR THE NEXT HANDOFF</span></div>
    </footer>
  );
}

function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([{ from: 'assistant', text: 'Hello. I’m the Northstar desk assistant. What can I help you move today?' }]);
  const options = [
    ['Plan a new route', 'Share your origin, destination, cargo type, and target delivery date. A route specialist can shape the right approach.'],
    ['Find warehouse space', 'Tell us your preferred location, volume, and storage window. We can match the program to your network.'],
    ['Talk to a specialist', 'Use the inquiry form and a Northstar specialist will reply within one business day.'],
  ];
  function chooseOption(label: string, response: string) {
    setMessages((current) => [...current, { from: 'user', text: label }, { from: 'assistant', text: response }]);
  }
  return (
    <>
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="fixed bottom-5 left-5 z-30 flex h-12 w-12 items-center justify-center bg-[#2d827a] text-[#f2f4ee] shadow-[0_10px_30px_rgba(23,47,67,.22)] transition-transform hover:-translate-y-1 sm:bottom-7 sm:left-7" aria-label="Chat with Northstar on WhatsApp" data-testid="button-floating-whatsapp"><MessageCircle size={21} /></a>
      <div className="fixed bottom-5 right-5 z-30 sm:bottom-7 sm:right-7">
        {open && (
          <div className="mb-3 w-[calc(100vw-40px)] max-w-[370px] overflow-hidden border border-[#b7c6c5] bg-[#f4f2eb] shadow-[0_18px_55px_rgba(23,47,67,.22)]" role="dialog" aria-label="Ask Logistics Assistant" data-testid="panel-logistics-assistant">
            <div className="flex items-center justify-between bg-[#172f43] px-5 py-4 text-[#f2f4ee]"><div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center bg-[#f4ad2d] text-[#172f43]"><Headphones size={17} /></span><div><p className="text-sm font-bold">Ask Logistics Assistant</p><p className="mono-label text-[8px] text-[#f4ad2d]">NORTHSTAR DESK / ONLINE</p></div></div><button onClick={() => setOpen(false)} className="text-[#f2f4ee]/60 hover:text-[#f2f4ee]" aria-label="Close assistant" data-testid="button-close-assistant"><X size={18} /></button></div>
            <div className="max-h-[310px] space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => <div key={`${message.text}-${index}`} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[86%] px-3 py-2.5 text-xs leading-relaxed ${message.from === 'user' ? 'bg-[#2d827a] text-[#f2f4ee]' : 'bg-[#e3dfd5] text-[#172f43]'}`} data-testid={`text-assistant-message-${index}`}>{message.text}</p></div>)}
            </div>
            <div className="border-t border-[#d2ccc1] p-4"><p className="mono-label mb-3 text-[8px] text-[#597080]">QUICK ACTIONS</p><div className="space-y-2">{options.map(([label, response]) => <button key={label} onClick={() => chooseOption(label, response)} className="flex w-full items-center justify-between border border-[#cfc9bd] px-3 py-2.5 text-left text-xs font-semibold text-[#172f43] transition-colors hover:border-[#2d827a] hover:bg-[#e3dfd5]" data-testid={`button-assistant-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}<ChevronRight size={14} className="text-[#2d827a]" /></button>)}</div></div>
          </div>
        )}
        <button onClick={() => setOpen((isOpen) => !isOpen)} className="group flex items-center gap-3 bg-[#f4ad2d] px-4 py-3 text-sm font-bold text-[#172f43] shadow-[0_10px_30px_rgba(23,47,67,.2)] transition-colors hover:bg-[#ffd06c]" aria-label="Open Ask Logistics Assistant" data-testid="button-open-assistant"><Headphones size={19} /><span className="hidden sm:inline">Ask Logistics Assistant</span><span className="sm:hidden">Assistant</span></button>
      </div>
    </>
  );
}

function Home() {
  const [selectedService, setSelectedService] = useState('Transportation');
  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden">
      <Header />
      <main>
        <Hero onSelectService={setSelectedService} />
        <TrustStrip />
        <About />
        <Services onSelectService={setSelectedService} />
        <FeaturedSolutions />
        <Solutions />
        <HowItWorks />
        <ContactForm selectedService={selectedService} onServiceChange={setSelectedService} />
        <CtaBanner />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <WouterRoute path="/" component={Home} />
        <WouterRoute component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;