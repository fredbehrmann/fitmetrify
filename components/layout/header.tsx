"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { calculatorCategories, mainNavLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-muted-foreground hover:text-primary text-sm font-medium transition-colors",
        active && "text-primary border-primary border-b-2 pb-0.5"
      )}
    >
      {label}
    </Link>
  );
}

function CalculatorsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 text-sm font-medium transition-colors outline-none">
        Calculadoras
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuItem asChild>
          <Link href="/calculadoras">Ver todas as calculadoras</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {calculatorCategories.map((group) => (
          <DropdownMenuGroup key={group.category}>
            <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            {group.calculators.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 px-4">
          {mainNavLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href}
            />
          ))}
          <div className="space-y-3 pt-2">
            <p className="text-tertiary text-xs font-semibold uppercase tracking-wider">
              Calculadoras
            </p>
            {calculatorCategories.map((group) => (
              <div key={group.category} className="space-y-2">
                <p className="text-sm font-medium">{group.label}</p>
                <div className="flex flex-col gap-2 pl-2">
                  {group.calculators.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button asChild className="mt-4">
            <Link href="/calculadora-imc">Começar</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            href="/"
            label="Início"
            active={pathname === "/"}
          />
          <CalculatorsDropdown />
          <NavLink href="#" label="Blog" />
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/calculadora-imc">Começar</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
