/**
 * Homepage Specific Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Render Sections
        renderAbout();
        renderWhyChooseUs();
        await renderServices();
        renderRemoteAdvantage();
        renderFutureVision();
        renderProcess();
        await renderPortfolio();
        await renderProducts();
        await renderTestimonials();
        renderFAQ();
        renderContact();
    } catch (err) {
        console.error('Error during section rendering:', err);
    } finally {
        // Always initialize scroll reveal after attempting to render sections
        if (typeof initScrollReveal === 'function') {
            initScrollReveal();
        } else {
            console.error('initScrollReveal not found');
        }
    }
});

function renderAbout() {
    const section = document.getElementById('about-section');
    if (!section) return;

    section.innerHTML = `
        <section id="about" class="py-16 bg-background">
            <div class="container mx-auto px-4">
                <div class="reveal max-w-3xl mx-auto text-center mb-10">
                    <h2 class="font-display text-4xl md:text-5xl font-bold">
                        Who We <span class="gradient-text">Are</span>
                    </h2>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div class="reveal flex justify-center">
                        <div class="relative rounded-2xl overflow-hidden shadow-2xl group w-full">
                            <img 
                                src="assets/images/about/about-us.png" 
                                alt="GenpandaZ Team" 
                                class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div class="reveal space-y-8">
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            GenpandaZ is your strategic partner in digital transformation. We specialize in building high-impact digital products that drive growth. Our expertise spans full-stack web development, intelligent AI automation, and user-centric UI/UX design.
                        </p>
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            With a remote-first mindset, we provide unparalleled flexibility and cost-efficiency to clients globally. We are committed to building scalable, future-ready systems that help businesses stay ahead in an ever-evolving digital landscape.
                        </p>
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            Whether you're a seed-stage startup or an established enterprise, our team in India turns ambitious ideas into reality with precision. We combine cutting-edge technology and design to deliver high-performance solutions tailored to your needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

async function renderServices() {
    const section = document.getElementById('services-section');
    if (!section) return;

    try {
        const response = await fetch('data/services.json');
        const services = await response.json();

        section.innerHTML = `
            <section id="services" class="py-16 bg-secondary/30">
                <div class="container mx-auto px-4">
                    <div class="reveal text-center max-w-4xl mx-auto">
                        <h2 class="font-display text-4xl md:text-5xl font-bold">
                            Our IT Services in <span class="gradient-text">India</span>
                        </h2>
                        <h3 class="mt-4 text-xl font-medium text-primary uppercase tracking-wider">Remote-First Solutions</h3>
                        <p class="mt-6 text-muted-foreground text-lg leading-relaxed">
                            GenpandaZ is a remote-first IT services company in India offering end-to-end digital solutions including website development, AI automation, UI/UX design, and custom software development. We help startups and businesses build scalable, future-ready products.
                        </p>
                    </div>

                    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        ${services.map((s, i) => `
                            <div class="reveal" style="transition-delay: ${i * 0.1}s;">
                                <div class="glass-card rounded-3xl overflow-hidden h-full group hover:shadow-2xl transition-all duration-500 border border-white/10 flex flex-col">
                                    <div class="h-64 relative overflow-hidden">
                                        <img 
                                            src="${s.image}" 
                                            alt="${s.title}" 
                                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div class="absolute bottom-6 left-6 z-10">
                                            <div class="h-12 w-12 rounded-2xl gradient-bg flex items-center justify-center mb-3">
                                                <i data-lucide="${s.icon.toLowerCase()}" class="h-6 w-6 text-primary-foreground"></i>
                                            </div>
                                            <h3 class="text-2xl font-bold text-white">${s.title}</h3>
                                        </div>
                                    </div>
                                    <div class="p-8 flex-1 flex flex-col">
                                        <h4 class="text-primary font-semibold mb-3">${s.subheading}</h4>
                                        <p class="text-muted-foreground leading-relaxed transition-all duration-300">
                                            ${s.shortDesc}
                                        </p>
                                        
                                        <div id="service-content-${i}" class="hidden mt-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                            <p class="text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-4">
                                                ${s.longDesc}
                                            </p>
                                            <ul class="grid grid-cols-1 gap-3">
                                                ${s.bullets.map(b => `
                                                    <li class="flex items-center gap-3 text-sm font-medium">
                                                        <i data-lucide="check-circle-2" class="h-4 w-4 text-primary shrink-0"></i>
                                                        ${b}
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </div>

                                        <div class="mt-auto pt-8">
                                            <button 
                                                id="service-btn-${i}"
                                                onclick="toggleService(${i})"
                                                class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all group/btn"
                                            >
                                                <span>Read More</span>
                                                <i data-lucide="chevron-down" class="h-4 w-4 transition-transform group-open:rotate-180"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
        lucide.createIcons();
    } catch (err) {
        console.error('Error rendering services', err);
    }
}

window.toggleService = (id) => {
    const allContents = document.querySelectorAll('[id^="service-content-"]');
    const allBtns = document.querySelectorAll('[id^="service-btn-"]');

    const targetContent = document.getElementById(`service-content-${id}`);
    const isExpanding = targetContent.classList.contains('hidden');

    // Close all other cards
    allContents.forEach((content, index) => {
        const btn = document.getElementById(`service-btn-${index}`);
        const icon = btn.querySelector('[data-lucide]');

        if (index === id) {
            if (isExpanding) {
                content.classList.remove('hidden');
                btn.querySelector('span').textContent = 'Read Less';
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                content.classList.add('hidden');
                btn.querySelector('span').textContent = 'Read More';
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        } else {
            content.classList.add('hidden');
            if (btn) {
                btn.querySelector('span').textContent = 'Read More';
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        }
    });
}

function renderWhyChooseUs() {
    const section = document.getElementById('why-choose-us-section');
    if (!section) return;

    const reasons = [
        "Remote-first model for faster and cost-effective delivery",
        "Startup-focused approach with scalable solutions",
        "Expertise in AI automation and modern technologies",
        "Clean, user-focused UI/UX design",
        "End-to-end development from idea to launch",
    ];

    section.innerHTML = `
        <section class="py-16 bg-secondary/30">
            <div class="container mx-auto px-4">
                <div class="reveal text-center max-w-3xl mx-auto mb-10">
                    <h2 class="font-display text-3xl md:text-5xl font-bold">Why Businesses Choose <span class="gradient-text">GenpandaZ</span></h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${reasons.map(r => `
                        <div class="reveal flex items-start gap-4 glass-card rounded-2xl p-6">
                            <div class="h-8 w-8 rounded-full gradient-bg flex items-center justify-center shrink-0">
                                <i data-lucide="check" class="h-4 w-4 text-primary-foreground"></i>
                            </div>
                            <p class="font-medium text-lg leading-snug">${r}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
    lucide.createIcons();
}

async function renderPortfolio() {
    const section = document.getElementById('portfolio-section');
    if (!section) return;

    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();

        section.innerHTML = `
            <section id="portfolio" class="py-16 bg-secondary/30">
                <div class="container mx-auto px-4">
                    <div class="reveal text-center max-w-2xl mx-auto">
                        <h2 class="font-display text-3xl md:text-5xl font-bold">
                            Our <span class="gradient-text">Portfolio</span>
                        </h2>
                        <p class="mt-4 text-muted-foreground text-lg">
                            A selection of projects that showcase our expertise.
                        </p>
                    </div>

                    <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${projects.map((p, i) => `
                            <div class="reveal" style="transition-delay: ${i * 0.08}s;">
                                <a 
                                    href="${p.link}" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    class="group block glass-card rounded-2xl overflow-hidden hover:scale-[1.03] transition-transform duration-300"
                                >
                                    <div class="h-56 relative overflow-hidden">
                                        <img 
                                            src="${p.image}" 
                                            alt="${p.title}" 
                                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div class="bg-white/20 p-3 rounded-full backdrop-blur-md">
                                                <i data-lucide="${p.icon.toLowerCase()}" class="h-8 w-8 text-white"></i>
                                            </div>
                                        </div>
                                        <div class="absolute top-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            <i data-lucide="external-link" class="h-5 w-5 text-white"></i>
                                        </div>
                                    </div>
                                    <div class="p-5">
                                        <p class="text-xs font-medium text-primary uppercase tracking-wider">${p.category}</p>
                                        <h3 class="font-display text-lg font-semibold mt-1">${p.title}</h3>
                                    </div>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
        lucide.createIcons();
    } catch (err) {
        console.error('Error rendering portfolio', err);
    }
}

async function renderProducts() {
    const section = document.getElementById('products-section');
    if (!section) return;

    try {
        const response = await fetch('data/products.json');
        const products = await response.json();

        section.innerHTML = `
            <section id="products" class="py-16 bg-background">
                <div class="container mx-auto px-4">
                    <div class="reveal text-center max-w-2xl mx-auto">
                        <h2 class="font-display text-3xl md:text-5xl font-bold">
                            Our <span class="gradient-text">Products</span>
                        </h2>
                        <p class="mt-4 text-muted-foreground text-lg">
                            Innovative tools and solutions built to enhance your productivity.
                        </p>
                    </div>

                    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        ${products.map((p, i) => `
                            <div class="reveal" style="transition-delay: ${i * 0.1}s;">
                                <div class="group relative glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300">
                                    <div class="h-56 flex items-center justify-center relative overflow-hidden ${!p.image ? `bg-gradient-to-br ${p.color}` : ''}">
                                        ${p.image ? `
                                            <img 
                                                src="${p.image}" 
                                                alt="${p.title}" 
                                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ` : `
                                            <i data-lucide="${p.icon.toLowerCase()}" class="h-16 w-16 text-white relative z-10"></i>
                                        `}
                                        
                                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                           <div class="bg-white/20 p-3 rounded-full backdrop-blur-md">
                                                <i data-lucide="${p.icon.toLowerCase()}" class="h-8 w-8 text-white"></i>
                                          </div>
                                        </div>

                                        ${p.status === "Active" ? `
                                           <a 
                                           href="${p.link}" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           class="absolute top-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                         >
                                            <i data-lucide="external-link" class="h-5 w-5 text-white"></i>
                                         </a>
                                        ` : `
                                          <span class="absolute top-4 right-4 bg-primary/20 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter backdrop-blur-md border border-primary/30 z-20">
                                            ${p.status}
                                          </span>
                                        `}
                                    </div>
                                    <div class="p-6">
                                        <div class="flex justify-between items-start mb-2">
                                          <p class="text-xs font-medium text-primary uppercase tracking-wider">${p.category}</p>
                                        </div>
                                        <h3 class="font-display text-xl font-bold mb-2">${p.title}</h3>
                                        <p class="text-muted-foreground text-sm leading-relaxed">
                                          ${p.description}
                                        </p>
                                        ${p.status === "Active" ? `
                                           <a 
                                           href="${p.link}" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           class="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:underline group/link"
                                         >
                                           Check it out
                                           <i data-lucide="external-link" class="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-0.5"></i>
                                         </a>
                                        ` : ''}
                                    </div>
                                    ${p.status === "Coming Soon" ? `
                                        <div class="absolute inset-0 bg-background/40 backdrop-blur-[1px] pointer-events-none flex items-center justify-center z-30">
                                          <span class="bg-primary/90 text-primary-foreground px-4 py-1 rounded-full font-bold text-sm transform -rotate-12 shadow-xl">
                                            Coming Soon
                                          </span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
        lucide.createIcons();
    } catch (err) {
        console.error('Error rendering products', err);
    }
}

async function renderTestimonials() {
    const section = document.getElementById('testimonials-section');
    if (!section) return;

    try {
        const response = await fetch('data/testimonials.json');
        const testimonials = await response.json();

        section.innerHTML = `
            <section id="testimonials" class="py-16 bg-secondary/30">
                <div class="container mx-auto px-4">
                    <div class="reveal text-center max-w-2xl mx-auto">
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">Trusted by <span class="gradient-text">Growing Businesses</span></h2>
                        <p class="text-muted-foreground max-w-2xl mx-auto">
                            Discover why businesses trust GenpandaZ for their digital growth.
                        </p>
                    </div>

                    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${testimonials.map((t, i) => `
                            <div class="reveal" style="transition-delay: ${i * 0.1}s;">
                                <div class="glass-card rounded-2xl p-6 h-full">
                                    <div class="flex gap-1 mb-4">
                                        ${[...Array(5)].map((_, j) => `
                                            <i data-lucide="star" class="h-4 w-4 fill-primary text-primary"></i>
                                        `).join('')}
                                    </div>
                                    <p class="text-muted-foreground leading-relaxed italic">"${t.text}"</p>
                                    <div class="mt-6 pt-4 border-t border-border">
                                        <p class="font-semibold text-sm">${t.name}</p>
                                        <p class="text-xs text-muted-foreground">${t.role}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
        lucide.createIcons();
    } catch (err) {
        console.error('Error rendering testimonials', err);
    }
}

function renderContact() {
    const section = document.getElementById('contact-section');
    if (!section) return;

    section.innerHTML = `
        <section id="contact" class="py-24 bg-background overflow-hidden">
            <div class="container mx-auto px-4 relative">
                <div class="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
                
                <div class="max-w-5xl mx-auto">
                    <div class="grid lg:grid-cols-2 gap-16 items-center">
                        <div class="reveal">
                            <h2 class="font-display text-4xl md:text-5xl font-bold mb-6">
                                Ready to scale your <span class="gradient-text">digital presence?</span>
                            </h2>
                            <p class="text-lg text-muted-foreground mb-6 leading-relaxed">
                                We're here to help you navigate the digital landscape. Let's discuss how we can bring your vision to life through innovative design, strategic development, and data-driven marketing solutions.
                            </p>
                            <p class="text-lg text-muted-foreground mb-10 leading-relaxed">
                                Whether you're looking to build a high-converting website, automate your business processes, or scale your brand's reach, our team of experts is ready to partner with you. We specialize in creating digital experiences that not only look stunning but also drive measurable growth for your business.
                            </p>
                            
                        </div>

                        <div class="reveal" style="transition-delay: 0.2s;">
                            <div class="glass-card rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
                                <form id="contact-form" class="space-y-6">
                                    <div class="grid md:grid-cols-2 gap-6">
                                        <div class="space-y-2">
                                            <label class="text-sm font-medium">Name</label>
                                            <input type="text" name="name" placeholder="John Doe" required class="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all outline-none">
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-sm font-medium">Email</label>
                                            <input type="email" name="email" placeholder="john@example.com" required class="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all outline-none">
                                        </div>
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-sm font-medium">Subject</label>
                                        <input type="text" name="subject" placeholder="Project Inquiry" required class="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all outline-none">
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-sm font-medium">Message</label>
                                        <textarea name="message" rows="4" placeholder="How can we help?" required class="flex min-h-[120px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all outline-none resize-none"></textarea>
                                    </div>
                                    <button type="submit" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-md font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-14 gradient-bg text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 group">
                                        Send Message
                                        <i data-lucide="send" class="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></i>
                                    </button>
                                </form>
                                <div id="form-status" class="mt-4 text-center text-sm hidden"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    lucide.createIcons();
    initContactForm();
}

function renderRemoteAdvantage() {
    const section = document.getElementById('remote-advantage-section');
    if (!section) return;

    section.innerHTML = `
        <section class="py-16 bg-background">
            <div class="container mx-auto px-4">
                <div class="reveal text-center max-w-4xl mx-auto mb-12">
                    <h2 class="font-display text-4xl md:text-5xl font-bold">Remote IT Services <span class="gradient-text">Across India</span></h2>
                    <h3 class="mt-4 text-primary font-semibold">Flexible Collaboration & Faster Delivery</h3>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div class="reveal space-y-6">
                        <p class="text-lg text-muted-foreground leading-relaxed">
                           GenpandaZ works remotely with clients across India including Chennai, Bangalore, Hyderabad, and Coimbatore. Our remote-first approach ensures flexibility, faster delivery, and cost-effective solutions without compromising quality.
                        </p>
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            We help you hire remote developers in India and build a dedicated remote tech team for your business. Our expertise in distributed team management allows us to integrate seamlessly with your existing workflows, providing high-quality software development and AI automation services regardless of your location.
                        </p>
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            Our remote-first culture is built on trust and efficiency, allowing us to deliver scalable SaaS solutions and custom software with unmatched speed. We leverage modern collaboration tools to keep you updated at every stage, ensuring your vision is brought to life with precision and excellence.
                        </p>
                    </div>
                    <div class="reveal">
                        <div class="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                            <img 
                                src="assets/images/remote-india.png" 
                                alt="Remote IT Services India" 
                                class="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderFutureVision() {
    const section = document.getElementById('future-vision-section');
    if (!section) return;

    section.innerHTML = `
        <section class="py-16 bg-secondary/30">
            <div class="container mx-auto px-4">
                <div class="reveal text-center max-w-4xl mx-auto">
                    <h2 class="font-display text-4xl md:text-5xl font-bold">Building Future-Ready <span class="gradient-text">Tech Products</span></h2>
                    <h3 class="mt-4 text-primary font-semibold">SaaS Innovation & Scalable Solutions</h3>
                    <p class="mt-8 text-xl text-muted-foreground leading-relaxed px-4">
                        GenpandaZ is evolving into a product-based company focused on building scalable SaaS solutions and innovative digital products that solve real-world problems. We are committed to becoming a leading SaaS product company in India, helping startups build tech products that scale.
                    </p>
                </div>
            </div>
        </section>
    `;
}

function renderProcess() {
    const section = document.getElementById('process-section');
    if (!section) return;

    const steps = [
        { title: "Discovery", desc: "Understand your idea and business goals" },
        { title: "Strategy", desc: "Plan and design the solution" },
        { title: "Execution", desc: "Develop and test the product" },
        { title: "Growth", desc: "Launch and support your growth" }
    ];

    section.innerHTML = `
        <section class="py-16 bg-background">
            <div class="container mx-auto px-4">
                <div class="reveal text-center max-w-3xl mx-auto mb-12">
                    <h2 class="font-display text-4xl md:text-5xl font-bold">How We <span class="gradient-text">Work</span></h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${steps.map((s, i) => `
                        <div class="reveal relative" style="transition-delay: ${i * 0.1}s;">
                            <div class="flex flex-col items-center text-center">
                                <div class="h-16 w-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 text-2xl font-bold text-primary-foreground shadow-lg">
                                    ${i + 1}
                                </div>
                                <h3 class="font-display text-xl font-bold mb-2">${s.title}</h3>
                                <p class="text-muted-foreground">${s.desc}</p>
                            </div>
                            ${i < steps.length - 1 ? `
                                <div class="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-primary/50 to-transparent -z-10 -ml-8"></div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderFAQ() {
    const section = document.getElementById('faq-section');
    if (!section) return;

    const faqs = [
        { q: "What services does GenpandaZ offer?", a: "We offer website development, AI automation, UI/UX design, and custom software development." },
        { q: "Do you work with startups?", a: "Yes, we specialize in working with startups and growing businesses." },
        { q: "Do you provide remote services across India?", a: "Yes, we work remotely with clients all across India." },
        { q: "Can you help build SaaS products?", a: "Yes, we provide MVP and full SaaS product development." }
    ];

    section.innerHTML = `
        <section class="py-16 bg-secondary/30">
            <div class="container mx-auto px-4">
                <div class="reveal text-center mb-12">
                    <h2 class="font-display text-4xl md:text-5xl font-bold">Frequently Asked <span class="gradient-text">Questions</span></h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    ${faqs.map((faq, i) => `
                        <div class="reveal" style="transition-delay: ${i * 0.1}s;">
                            <div class="glass-card rounded-2xl p-6 h-full border border-white/5 hover:border-primary/20 transition-all">
                                <h3 class="font-display text-xl font-bold mb-3 flex items-start gap-3">
                                    <span class="text-primary mt-1">
                                        <i data-lucide="help-circle" class="h-5 w-5"></i>
                                    </span>
                                    ${faq.q}
                                </h3>
                                <p class="text-muted-foreground leading-relaxed pl-8">
                                    ${faq.a}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}



function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form || !status) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        status.textContent = 'Sending...';
        status.classList.remove('hidden', 'text-green-500', 'text-red-500');
        status.classList.add('text-muted-foreground');

        try {
            // In a real scenario, this would be fetched from .env via a build tool or injected
            // Here we use the URL directly as per the request
            const response = await fetch('https://formspree.io/f/mvzbqaqr', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                status.textContent = 'Message sent successfully!';
                status.classList.add('text-green-500');
                form.reset();
            } else {
                status.textContent = 'Oops! There was a problem submitting your form.';
                status.classList.add('text-red-500');
            }
        } catch (err) {
            status.textContent = 'Oops! There was a problem submitting your form.';
            status.classList.add('text-red-500');
        }
    });
}
