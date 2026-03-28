/**
 * Homepage Specific Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Render Sections
        renderAbout();
        await renderServices();
        renderWhyChooseUs();
        await renderPortfolio();
        await renderProducts();
        await renderTestimonials();
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
        <section id="about" class="py-12 bg-background">
            <div class="container mx-auto px-4">
                <div class="reveal max-w-3xl mx-auto text-center mb-16">
                    <h2 class="font-display text-4xl md:text-5xl font-bold">
                        Who We <span class="gradient-text">Are</span>
                    </h2>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div class="reveal flex justify-center lg:justify-end">
                        <div class="relative rounded-2xl overflow-hidden shadow-2xl group max-w-4xl">
                            <img 
                                src="assets/images/about/about-us.png" 
                                alt="GenpandaZ Team collaborating" 
                                class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p class="text-white text-xs font-medium">Fueled by curiosity, driven by technology.</p>
                            </div>
                        </div>
                    </div>

                    <div class="reveal space-y-6" style="transition-delay: 0.2s;">
                        <div class="space-y-6">
                            <p class="text-lg text-muted-foreground leading-relaxed">
                                GenpandaZ is a technology startup driven by a group of young, motivated technologists who believe the future of business is powered by intelligent digital systems. We simplify the complex, removing friction through software development, automation engineering, and data intelligence.
                            </p>
                            <p class="text-lg text-muted-foreground leading-relaxed">
                                Our team combines deep expertise in modern tech stacks with a bold, experimental mindset to design digital products that deliver real value. Focused on curiosity and practical innovation, we don't just solve today's challenges—we build the intelligent platforms and automated systems that move industries forward and help businesses thrive in an ever-changing digital landscape.
                            </p>
                            <p class="text-lg text-muted-foreground leading-relaxed">
                                Through continuous learning and innovation, we make advanced technology accessible and impactful for businesses of all sizes, ensuring success is built together as a team.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-border">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-primary font-bold text-2xl">Practical</p>
                                    <p class="text-sm text-muted-foreground uppercase tracking-tight">Innovation</p>
                                </div>
                                <div>
                                    <p class="text-primary font-bold text-2xl">Collective</p>
                                    <p class="text-sm text-muted-foreground uppercase tracking-tight">Growth</p>
                                </div>
                            </div>
                        </div>
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
            <section id="services" class="py-12 bg-secondary/30">
                <div class="container mx-auto px-4">
                    <div class="reveal text-center max-w-2xl mx-auto">
                        <h2 class="font-display text-3xl md:text-5xl font-bold">
                            Our <span class="gradient-text">Services</span>
                        </h2>
                        <p class="mt-4 text-muted-foreground text-lg">
                            End-to-end digital solutions tailored to grow your business.
                        </p>
                    </div>

                    <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${services.map((s, i) => `
                            <div class="reveal" style="transition-delay: ${i * 0.08}s;">
                                <div class="glass-card rounded-2xl overflow-hidden h-full group hover:scale-[1.03] transition-all duration-300 flex flex-col">
                                    <div class="h-48 relative overflow-hidden">
                                        <img 
                                            src="${s.image}" 
                                            alt="${s.title}" 
                                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                                        <div class="absolute top-4 left-4 h-12 w-12 rounded-xl gradient-bg flex items-center justify-center z-10">
                                            <i data-lucide="${s.icon.toLowerCase()}" class="h-6 w-6 text-primary-foreground"></i>
                                        </div>
                                    </div>
                                    <div class="p-6 flex-1 flex flex-col justify-center">
                                        <h3 class="font-display text-lg font-semibold">${s.title}</h3>
                                        <p class="mt-2 text-sm text-muted-foreground leading-relaxed">${s.desc}</p>
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

function renderWhyChooseUs() {
    const section = document.getElementById('why-choose-us-section');
    if (!section) return;

    const reasons = [
        "Young & Agile Team",
        "Data-Driven Decisions",
        "Transparent Communication",
        "Fast Turnaround Times",
        "Modern Tech Stack",
        "Dedicated Support",
    ];

    section.innerHTML = `
        <section class="py-12">
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <div class="reveal">
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose GenpandaZ?</h2>
                        <p class="mt-6 text-muted-foreground text-lg leading-relaxed">
                            We don't just build websites — we build growth engines. Our team combines creativity, strategy, and technology to deliver results you can measure.
                        </p>
                    </div>

                    <div class="reveal" style="transition-delay: 0.15s;">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            ${reasons.map(r => `
                                <div class="flex items-center gap-3 glass-card rounded-xl p-4">
                                    <i data-lucide="check-circle" class="h-5 w-5 text-primary shrink-0"></i>
                                    <span class="font-medium text-sm">${r}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
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
            <section id="portfolio" class="py-12 bg-secondary/30">
                <div class="container mx-auto px-4">
                    <div class="reveal text-center max-w-2xl mx-auto">
                        <h2 class="font-display text-3xl md:text-5xl font-bold">
                            Our <span class="gradient-text">Portfolio</span>
                        </h2>
                        <p class="mt-4 text-muted-foreground text-lg">
                            A selection of projects that showcase our expertise.
                        </p>
                    </div>

                    <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <section id="products" class="py-12 bg-background">
                <div class="container mx-auto px-4">
                    <div class="reveal text-center max-w-2xl mx-auto">
                        <h2 class="font-display text-3xl md:text-5xl font-bold">
                            Our <span class="gradient-text">Products</span>
                        </h2>
                        <p class="mt-4 text-muted-foreground text-lg">
                            Innovative tools and solutions built to enhance your productivity.
                        </p>
                    </div>

                    <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
            <section id="testimonials" class="py-12 bg-secondary/30">
                <div class="container mx-auto px-4">
                    <div class="reveal text-center max-w-2xl mx-auto">
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
                        <p class="text-muted-foreground max-w-2xl mx-auto">
                            Discover why businesses trust GenpandaZ for their digital growth.
                        </p>
                    </div>

                    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            <p class="text-lg text-muted-foreground mb-10 leading-relaxed">
                                We're here to help you navigate the digital landscape. Let's discuss how we can bring your vision to life.
                            </p>
                            
                            <div class="space-y-6">
                                <div class="flex items-center gap-4">
                                    <div class="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground">
                                        <i data-lucide="mail"></i>
                                    </div>
                                    <div>
                                        <p class="text-xs text-muted-foreground uppercase tracking-widest font-bold">Email Us</p>
                                        <p class="font-medium">contact@genpandaz.com</p>
                                    </div>
                                </div>
                            </div>
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
