/**
 * UI Primitive Factory Functions
 */

export function createButton({ label, href, variant = 'default', size = 'default', className = '', onclick = null, asChild = false }) {
    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'gradient-bg text-primary-foreground hover:opacity-90',
    };

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
    };

    const baseClass = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';
    
    const combinedClass = `${baseClass} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`.trim();

    if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.className = combinedClass;
        a.innerHTML = label;
        return a;
    }

    const button = document.createElement('button');
    button.className = combinedClass;
    button.innerHTML = label;
    if (onclick) button.onclick = onclick;
    return button;
}

export function createBadge({ label, variant = 'default', className = '' }) {
    const variants = {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
    };

    const baseClass = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
    const combinedClass = `${baseClass} ${variants[variant] || variants.default} ${className}`.trim();

    const badge = document.createElement('div');
    badge.className = combinedClass;
    badge.textContent = label;
    return badge;
}
