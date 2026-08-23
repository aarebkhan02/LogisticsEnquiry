import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Boxes,
  ChevronRight,
  CircleCheck,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Route,
  Send,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
  X,
} from 'lucide-react';
import { Route as WouterRoute, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const WHATSAPP_URL = 'https://wa.me/15550147862';

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
    title: 'Road transport',
    description: 'Regional and cross-border road freight with disciplined handoffs, live milestones, and dependable delivery windows.',
    tag: 'FTL / LTL',
  },
  {
    number: '02',
    icon: Ship,
    title: 'Freight coordination',
    description: 'One control tower for ocean, air, and rail bookings — built around the route, not a single mode.',
    tag: 'OCEAN / AIR / RAIL',
  },
  {
    number: '03',
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Flexible storage, cross-docking, pick-and-pack, and inventory visibility where your network needs it.',
    tag: 'STORAGE / FULFILMENT',
  },
  {
    number: '04',
    icon: PackageCheck,
    title: 'Courier delivery',
    description: 'Time-critical final mile for samples, documents, spare parts, and the shipments that cannot wait.',
    tag: 'SAME DAY / NEXT DAY',
  },
];

const solutionItems = [
  { title: 'Industrial supply chains', copy: 'Keep production moving with scheduled inbound freight and exception handling.', icon: Boxes },
  { title: 'Retail & distribution', copy: 'Move seasonal volume with a partner who can flex without losing the details.', icon: Route },
  { title: 'High-value cargo', copy: 'Add the chain-of-custody, secure handling, and documentation your cargo deserves.', icon: ShieldCheck },
];

type AssistantMessage = { from: 'assistant' | 'user'; text: string };

function scrollToInquiry() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3" data-testid="link-logo">
      <span className="relative flex h-10 w-10 items-center justify-center bg-[#f7a928] text-[#173043]">
        <span className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-[#173043]" />
        <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#173043]" />
        <Route size={22} strokeWidth={2.8} />
      </span>
      <span>
        <span className="block font-semibold leading-none tracking-[0.18em] text-[#f3efe5]">NORTHSTAR</span>
        <span className="mono-label mt-1 block text-[9px] text-[#f7a928]">LOGISTICS GROUP</span>
      </span>
    </a>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-[#173043]/90 text-[#f3efe5] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-[#f3efe5]/70 transition-colors hover:text-[#f7a928]" data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#f3efe5]/70 transition-colors hover:text-[#f7a928]" data-testid="link-header-whatsapp">
            <MessageCircle size={15} /> WhatsApp
          </a>
          <button onClick={scrollToInquiry} className="flex items-center gap-2 bg-[#f7a928] px-4 py-2.5 text-sm font-bold text-[#173043] transition-colors hover:bg-[#ffc15b]" data-testid="button-header-inquiry">
            Start an inquiry <ArrowUpRight size={16} />
          </button>
        </div>
        <button onClick={() => setMobileOpen((open) => !open)} className="text-[#f3efe5] md:hidden" aria-label="Toggle menu" data-testid="button-mobile-menu">
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#173043] px-6 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="border-b border-white/10 py-4 text-sm text-[#f3efe5]/80" data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <button onClick={() => { setMobileOpen(false); scrollToInquiry(); }} className="mt-5 flex w-full items-center justify-center gap-2 bg-[#f7a928] px-4 py-3 text-sm font-bold text-[#173043]" data-testid="button-mobile-inquiry">
            Start an inquiry <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[720px] items-end overflow-hidden bg-[#173043] pt-28 text-[#f3efe5] lg:min-h-[820px]">
      <img src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=2000" alt="Container ship moving through a blue harbor" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#173043_8%,rgba(23,48,67,.86)_42%,rgba(23,48,67,.22)_100%)]" />
      <div className="absolute right-0 top-0 hidden h-full w-[42%] border-l border-white/10 lg:block" />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="max-w-3xl reveal">
          <p className="mono-label mb-6 flex items-center gap-3 text-xs text-[#f7a928]"><span className="h-px w-10 bg-[#f7a928]" /> MOVE WITH CERTAINTY</p>
          <h1 className="display-font max-w-4xl text-[4.5rem] font-semibold uppercase leading-[0.83] tracking-[-0.06em] text-[#f3efe5] sm:text-[6.4rem] lg:text-[8.6rem]">
            The route<br /><span className="text-[#f7a928]">ahead.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#f3efe5]/72 sm:text-xl">
            Transportation, freight coordination, and supply chain solutions for businesses that cannot afford a missed handoff.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <button onClick={scrollToInquiry} className="group flex items-center gap-3 bg-[#f7a928] px-6 py-4 text-sm font-bold text-[#173043] transition-colors hover:bg-[#ffc15b]" data-testid="button-hero-inquiry">
              Talk to our team <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <a href="#services" className="flex items-center gap-2 text-sm font-semibold text-[#f3efe5] transition-colors hover:text-[#f7a928]" data-testid="link-hero-services">
              Explore capabilities <ChevronRight size={17} />
            </a>
          </div>
        </div>
        <div className="mt-20 grid max-w-3xl grid-cols-2 gap-y-7 border-t border-white/20 pt-6 sm:grid-cols-4 reveal reveal-delay-2">
          {[
            ['18', 'countries served'],
            ['24/7', 'control tower'],
            ['98.4%', 'on-time delivery'],
            ['31 yrs', 'in motion'],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="display-font text-3xl text-[#f7a928]">{stat}</p>
              <p className="mono-label mt-1 text-[9px] text-[#f3efe5]/50">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 right-6 hidden items-center gap-3 lg:flex">
        <span className="mono-label text-[10px] text-[#f3efe5]/50">SCROLL TO DISCOVER</span>
        <ArrowDownRight size={17} className="text-[#f7a928]" />
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="border-b border-[#d9d1c4] bg-[#e9e3d8]">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 px-6 py-6 sm:flex-row sm:items-center lg:px-10">
        <p className="mono-label text-[10px] text-[#597080]">TRUSTED TO KEEP BUSINESS MOVING</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-[#173043]/65">
          <span>Helio Manufacturing</span><span>OAK &amp; IRON</span><span>Vantage Medical</span><span>Maritime North</span>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="paper-grid bg-[#f3efe5] px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-28">
        <div>
          <p className="mono-label flex items-center gap-3 text-[10px] text-[#2d827a]"><span className="h-2 w-2 bg-[#2d827a]" /> 01 / ABOUT NORTHSTAR</p>
          <h2 className="display-font mt-7 text-6xl font-semibold uppercase leading-[0.9] text-[#173043] sm:text-7xl lg:text-[7.2rem]">More than<br /><span className="text-[#2d827a]">mileage.</span></h2>
          <div className="mt-12 flex items-center gap-4 border-t border-[#cfc5b5] pt-5">
            <div className="flex h-12 w-12 items-center justify-center bg-[#173043] text-[#f7a928]"><Globe2 size={22} /></div>
            <p className="max-w-xs text-sm leading-relaxed text-[#597080]">One accountable partner from first mile to final delivery.</p>
          </div>
        </div>
        <div className="lg:pt-16">
          <p className="max-w-2xl text-2xl leading-snug text-[#173043] sm:text-3xl">We make complex movement feel straightforward. Northstar connects people, cargo, and critical timelines across a single, visible network.</p>
          <p className="mt-7 max-w-xl leading-relaxed text-[#597080]">From a pallet leaving Monterrey to a priority part landing in Rotterdam, our teams coordinate the details behind the scenes so your operation can stay focused on what is next. We pair local judgment with international reach — and answer the phone when the plan changes.</p>
          <div className="mt-10 grid gap-7 border-t border-[#cfc5b5] pt-7 sm:grid-cols-2">
            <div><p className="display-font text-5xl text-[#173043]">04</p><p className="mono-label mt-2 text-[10px] text-[#597080]">INTERNATIONAL HUBS</p></div>
            <div><p className="display-font text-5xl text-[#173043]">1,260</p><p className="mono-label mt-2 text-[10px] text-[#597080]">LOCAL CARRIER PARTNERS</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-[#173043] px-6 py-24 text-[#f3efe5] lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mono-label flex items-center gap-3 text-[10px] text-[#f7a928]"><span className="h-2 w-2 bg-[#f7a928]" /> 02 / CAPABILITIES</p>
            <h2 className="display-font mt-6 max-w-2xl text-6xl font-semibold uppercase leading-[0.88] sm:text-7xl lg:text-[7rem]">Built around<br /><span className="text-[#f7a928]">your cargo.</span></h2>
          </div>
          <p className="max-w-sm leading-relaxed text-[#f3efe5]/60">A precise service for every leg, backed by people who understand what a delay really costs.</p>
        </div>
        <div className="mt-16 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.number} className="group border-b border-white/15 p-6 pl-0 transition-colors hover:bg-[#22465c] lg:border-b-0 lg:border-r lg:p-8 lg:first:pl-0 lg:last:border-r-0">
                <div className="flex items-start justify-between">
                  <Icon size={28} strokeWidth={1.5} className="text-[#f7a928]" />
                  <span className="mono-label text-[10px] text-[#f3efe5]/40">{service.number}</span>
                </div>
                <h3 className="display-font mt-16 text-4xl uppercase leading-none">{service.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-[#f3efe5]/58">{service.description}</p>
                <p className="mono-label mt-8 text-[9px] text-[#f7a928]">{service.tag}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="bg-[#e9e3d8] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <div>
          <p className="mono-label flex items-center gap-3 text-[10px] text-[#2d827a]"><span className="h-2 w-2 bg-[#2d827a]" /> 03 / SECTOR SOLUTIONS</p>
          <h2 className="display-font mt-7 text-6xl font-semibold uppercase leading-[0.88] text-[#173043] sm:text-7xl lg:text-[6.7rem]">The right<br /><span className="text-[#2d827a]">fit.</span></h2>
          <p className="mt-8 max-w-sm leading-relaxed text-[#597080]">Your industry has its own pressure points. Our operating model adapts around them — not the other way around.</p>
          <a href="#contact" className="mt-9 inline-flex items-center gap-3 border-b-2 border-[#f7a928] pb-2 text-sm font-bold text-[#173043] transition-colors hover:text-[#2d827a]" data-testid="link-solutions-contact">Discuss your network <ArrowUpRight size={16} /></a>
        </div>
        <div className="space-y-3">
          {solutionItems.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div key={solution.title} className="group grid gap-5 border-t border-[#cfc5b5] py-7 sm:grid-cols-[52px_1fr_auto] sm:items-center">
                <div className="flex h-11 w-11 items-center justify-center bg-[#173043] text-[#f7a928]"><Icon size={20} /></div>
                <div><p className="mono-label text-[9px] text-[#597080]">0{index + 1} / SOLUTION</p><h3 className="mt-2 text-xl font-semibold text-[#173043]">{solution.title}</h3><p className="mt-2 max-w-lg text-sm leading-relaxed text-[#597080]">{solution.copy}</p></div>
                <ArrowUpRight size={21} className="text-[#2d827a] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NetworkSection() {
  return (
    <section className="relative overflow-hidden bg-[#2d827a] px-6 py-24 text-[#f3efe5] lg:px-10 lg:py-32">
      <div className="absolute -right-24 -top-28 h-[460px] w-[460px] rounded-full border border-white/20" />
      <div className="absolute -right-8 -top-12 h-[340px] w-[340px] rounded-full border border-white/20" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <p className="mono-label text-[10px] text-[#f7d48e]">THE NORTHSTAR NETWORK</p>
          <h2 className="display-font mt-7 max-w-3xl text-6xl font-semibold uppercase leading-[0.87] sm:text-7xl lg:text-[7.5rem]">Local eyes.<br /><span className="text-[#f7d48e]">Global view.</span></h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#f3efe5]/75">Our teams work in your time zone and think in the full picture. That is how a route stays resilient when conditions change.</p>
        </div>
        <div className="relative min-h-[300px]">
          <div className="absolute left-[12%] top-[20%] h-2.5 w-2.5 bg-[#f7a928] shadow-[0_0_0_7px_rgba(247,169,40,.22)]" />
          <div className="absolute left-[42%] top-[55%] h-2.5 w-2.5 bg-[#f7a928] shadow-[0_0_0_7px_rgba(247,169,40,.22)]" />
          <div className="absolute right-[15%] top-[28%] h-2.5 w-2.5 bg-[#f7a928] shadow-[0_0_0_7px_rgba(247,169,40,.22)]" />
          <div className="absolute left-[13%] top-[23%] h-px w-[68%] rotate-[16deg] bg-[#f7d48e]/60" />
          <div className="absolute left-[43%] top-[57%] h-px w-[40%] -rotate-[28deg] bg-[#f7d48e]/60" />
          <div className="absolute left-[8%] top-[12%] text-[10px] font-medium text-[#f3efe5]/65">VANCOUVER</div>
          <div className="absolute left-[39%] top-[64%] text-[10px] font-medium text-[#f3efe5]/65">MONTERREY</div>
          <div className="absolute right-[3%] top-[19%] text-[10px] font-medium text-[#f3efe5]/65">ROTTERDAM</div>
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 pt-4"><p className="mono-label text-[9px] text-[#f7d48e]">18 COUNTRIES / ONE CONTROL TOWER</p></div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [formKey, setFormKey] = useState(0);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
    setFormKey((key) => key + 1);
  }
  return (
    <section id="contact" className="bg-[#f3efe5] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-28">
        <div>
          <p className="mono-label flex items-center gap-3 text-[10px] text-[#2d827a]"><span className="h-2 w-2 bg-[#2d827a]" /> 04 / START A CONVERSATION</p>
          <h2 className="display-font mt-7 text-6xl font-semibold uppercase leading-[0.87] text-[#173043] sm:text-7xl lg:text-[6.5rem]">Let's move<br /><span className="text-[#f7a928]">forward.</span></h2>
          <p className="mt-8 max-w-sm leading-relaxed text-[#597080]">Tell us what is moving, where it needs to go, and what is at stake. A Northstar specialist will be in touch within one business day.</p>
          <div className="mt-12 space-y-5 border-t border-[#cfc5b5] pt-6 text-sm text-[#173043]">
            <a href="mailto:hello@northstarlogistics.example" className="flex items-center gap-3 transition-colors hover:text-[#2d827a]" data-testid="link-contact-email"><Mail size={17} className="text-[#2d827a]" /> hello@northstarlogistics.example</a>
            <a href="tel:+15550147862" className="flex items-center gap-3 transition-colors hover:text-[#2d827a]" data-testid="link-contact-phone"><Phone size={17} className="text-[#2d827a]" /> +1 555 014 7862</a>
            <p className="flex items-center gap-3"><MapPin size={17} className="text-[#2d827a]" /> 88 Harbor Exchange, Seattle, WA</p>
          </div>
        </div>
        <div className="relative bg-[#e9e3d8] p-6 sm:p-10">
          {sent && (
            <div className="mb-7 flex items-start gap-3 border border-[#2d827a]/30 bg-[#d7ebe5] p-4 text-sm text-[#173043]" role="status" data-testid="status-inquiry-success">
              <CircleCheck size={20} className="shrink-0 text-[#2d827a]" />
              <div><p className="font-bold">Inquiry received.</p><p className="mt-1 text-[#597080]">Thanks — our team will review the route and be in touch shortly.</p></div>
              <button onClick={() => setSent(false)} className="ml-auto text-[#597080] hover:text-[#173043]" aria-label="Dismiss success message" data-testid="button-dismiss-success"><X size={16} /></button>
            </div>
          )}
          <form key={formKey} onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2"><label htmlFor="name" className="mono-label text-[10px] text-[#597080]">YOUR NAME *</label><input id="name" name="name" required placeholder="Avery Morgan" className="mt-2 w-full border-0 border-b border-[#bdb3a4] bg-transparent px-0 py-3 text-[#173043] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-name" /></div>
            <div><label htmlFor="company" className="mono-label text-[10px] text-[#597080]">COMPANY *</label><input id="company" name="company" required placeholder="Company name" className="mt-2 w-full border-0 border-b border-[#bdb3a4] bg-transparent px-0 py-3 text-[#173043] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-company" /></div>
            <div><label htmlFor="email" className="mono-label text-[10px] text-[#597080]">WORK EMAIL *</label><input id="email" name="email" type="email" required placeholder="you@company.com" className="mt-2 w-full border-0 border-b border-[#bdb3a4] bg-transparent px-0 py-3 text-[#173043] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-email" /></div>
            <div><label htmlFor="origin" className="mono-label text-[10px] text-[#597080]">ORIGIN</label><input id="origin" name="origin" placeholder="City / country" className="mt-2 w-full border-0 border-b border-[#bdb3a4] bg-transparent px-0 py-3 text-[#173043] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-origin" /></div>
            <div><label htmlFor="destination" className="mono-label text-[10px] text-[#597080]">DESTINATION</label><input id="destination" name="destination" placeholder="City / country" className="mt-2 w-full border-0 border-b border-[#bdb3a4] bg-transparent px-0 py-3 text-[#173043] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="input-inquiry-destination" /></div>
            <div className="sm:col-span-2"><label htmlFor="message" className="mono-label text-[10px] text-[#597080]">WHAT ARE YOU MOVING?</label><textarea id="message" name="message" rows={3} placeholder="Cargo type, timing, special requirements..." className="mt-2 w-full resize-none border-0 border-b border-[#bdb3a4] bg-transparent px-0 py-3 text-[#173043] outline-none placeholder:text-[#597080]/55 focus:border-[#2d827a]" data-testid="textarea-inquiry-message" /></div>
            <div className="flex items-center justify-between gap-5 pt-2 sm:col-span-2"><p className="max-w-xs text-xs leading-relaxed text-[#597080]">By submitting, you agree to be contacted about this request.</p><button type="submit" className="flex shrink-0 items-center gap-3 bg-[#173043] px-5 py-3.5 text-sm font-bold text-[#f3efe5] transition-colors hover:bg-[#2d827a]" data-testid="button-submit-inquiry">Send inquiry <Send size={16} /></button></div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#173043] px-6 py-12 text-[#f3efe5] lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 border-b border-white/15 pb-12 md:grid-cols-[1fr_auto_auto] md:items-end">
        <div><Logo /><p className="mt-6 max-w-xs text-sm leading-relaxed text-[#f3efe5]/55">Freight that keeps its word. Transportation and supply chain solutions built for the real world.</p></div>
        <div><p className="mono-label mb-4 text-[9px] text-[#f7a928]">EXPLORE</p><div className="flex flex-col gap-3 text-sm text-[#f3efe5]/65">{navItems.slice(1).map((item) => <a key={item.href} href={item.href} className="transition-colors hover:text-[#f7a928]" data-testid={`link-footer-${item.label.toLowerCase()}`}>{item.label}</a>)}</div></div>
        <div><p className="mono-label mb-4 text-[9px] text-[#f7a928]">CONNECT</p><div className="flex flex-col gap-3 text-sm text-[#f3efe5]/65"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#f7a928]" data-testid="link-footer-whatsapp">WhatsApp desk</a><a href="mailto:hello@northstarlogistics.example" className="transition-colors hover:text-[#f7a928]" data-testid="link-footer-email">Email the team</a></div></div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 pt-6 text-[10px] text-[#f3efe5]/35 sm:flex-row"><span>© 2025 Northstar Logistics Group</span><span className="mono-label text-[9px]">BUILT FOR THE NEXT HANDOFF</span></div>
    </footer>
  );
}

function LogisticsAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([{ from: 'assistant', text: 'Hello. I’m the Northstar desk assistant. What can I help you move today?' }]);
  const options = [
    ['Get a freight estimate', 'For a quick estimate, share your origin, destination, cargo type, and target delivery date. I’ll point you to the right team.'],
    ['Track a shipment', 'This prototype does not connect to live tracking yet. Send your reference to hello@northstarlogistics.example and our desk will look it up.'],
    ['Talk to a specialist', 'Absolutely. Use the inquiry form and a route specialist will reply within one business day.'],
  ];
  function chooseOption(label: string, response: string) {
    setMessages((current) => [...current, { from: 'user', text: label }, { from: 'assistant', text: response }]);
  }
  return (
    <div className="fixed bottom-5 right-5 z-30 sm:bottom-7 sm:right-7">
      {open && (
        <div className="mb-3 w-[calc(100vw-40px)] max-w-[370px] overflow-hidden border border-[#b6c5c8] bg-[#f3efe5] shadow-[0_18px_55px_rgba(23,48,67,.22)]" role="dialog" aria-label="Logistics Assistant" data-testid="panel-logistics-assistant">
          <div className="flex items-center justify-between bg-[#173043] px-5 py-4 text-[#f3efe5]"><div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center bg-[#f7a928] text-[#173043]"><Bot size={17} /></span><div><p className="text-sm font-bold">Logistics Assistant</p><p className="mono-label text-[8px] text-[#f7a928]">NORTHSTAR DESK / ONLINE</p></div></div><button onClick={() => setOpen(false)} className="text-[#f3efe5]/60 hover:text-[#f3efe5]" aria-label="Close assistant" data-testid="button-close-assistant"><X size={18} /></button></div>
          <div className="max-h-[310px] space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => <div key={`${message.text}-${index}`} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[86%] px-3 py-2.5 text-xs leading-relaxed ${message.from === 'user' ? 'bg-[#2d827a] text-[#f3efe5]' : 'bg-[#e3ddd1] text-[#173043]'}`} data-testid={`text-assistant-message-${index}`}>{message.text}</p></div>)}
          </div>
          <div className="border-t border-[#d2c8b9] p-4"><p className="mono-label mb-3 text-[8px] text-[#597080]">SELECT A TOPIC</p><div className="space-y-2">{options.map(([label, response]) => <button key={label} onClick={() => chooseOption(label, response)} className="flex w-full items-center justify-between border border-[#cfc5b5] px-3 py-2.5 text-left text-xs font-semibold text-[#173043] transition-colors hover:border-[#2d827a] hover:bg-[#e3ddd1]" data-testid={`button-assistant-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}<ChevronRight size={14} className="text-[#2d827a]" /></button>)}</div></div>
        </div>
      )}
      <button onClick={() => setOpen((isOpen) => !isOpen)} className="group flex items-center gap-3 bg-[#f7a928] px-4 py-3 text-sm font-bold text-[#173043] shadow-[0_10px_30px_rgba(23,48,67,.2)] transition-colors hover:bg-[#ffc15b]" aria-label="Open Logistics Assistant" data-testid="button-open-assistant"><Bot size={19} /><span className="hidden sm:inline">Logistics Assistant</span><span className="sm:hidden">Desk</span></button>
    </div>
  );
}

function Home() {
  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <Solutions />
        <NetworkSection />
        <ContactForm />
      </main>
      <Footer />
      <LogisticsAssistant />
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