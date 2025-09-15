'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { Nav } from '@/components/nav';
import { LogOut, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { users } from '@/lib/data';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const currentUser = users[0];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="font-headline text-2xl font-bold text-primary-foreground">
          CivicWatch
        </SidebarHeader>
        <SidebarContent>
          <Nav />
        </SidebarContent>
        <SidebarFooter className="flex-row items-center gap-2 border-t border-sidebar-border p-2">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              data-ai-hint="person"
            />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {currentUser.points} points
            </p>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <LogOut className="h-4 w-4" />
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
