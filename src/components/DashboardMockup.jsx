
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Calendar, Users, Target } from 'lucide-react';

const DashboardMockup = () => {
  const kpis = [
    { label: 'Nuevos leads', value: '47', change: '+12%', icon: Users, color: 'text-primary' },
    { label: 'Citas confirmadas', value: '23', change: '+8%', icon: Calendar, color: 'text-primary' },
    { label: 'Tasa conversión', value: '48.9%', change: '+5.2%', icon: Target, color: 'text-accent' },
    { label: 'Respuesta media', value: '47s', change: '-23s', icon: TrendingUp, color: 'text-foreground/80' },
  ];

  const sampleLeads = [
    { name: 'Maya Chen', company: 'TechFlow Solutions', status: 'qualified', score: 87, nextAction: 'Enviar propuesta' },
    { name: 'Raj Patel', company: 'CloudSync Inc', status: 'contacted', score: 72, nextAction: 'Llamada seguimiento' },
    { name: 'Lucia Torres', company: 'DataVault Systems', status: 'new', score: 65, nextAction: 'Calificar lead' },
  ];

  const sampleAppointments = [
    { lead: 'Maya Chen', company: 'TechFlow Solutions', date: '2026-06-29', channel: 'Videollamada', status: 'confirmed' },
    { lead: 'Kwame Asante', company: 'SecureNet Ltd', date: '2026-06-30', channel: 'Presencial', status: 'confirmed' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      qualified: 'border border-primary/20 bg-primary/10 text-primary',
      contacted: 'border border-white/10 bg-muted/60 text-muted-foreground',
      new: 'border border-white/10 bg-background/60 text-muted-foreground',
      confirmed: 'border border-primary/20 bg-primary/10 text-primary',
    };
    return colors[status] || 'border border-white/10 bg-muted/60 text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                <span className="text-xs font-medium text-primary">{kpi.change}</span>
              </div>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{kpi.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleLeads.map((lead, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{lead.name}</div>
                        <div className="text-xs text-muted-foreground">{lead.company}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{lead.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Próximas citas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Canal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleAppointments.map((apt, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{apt.lead}</div>
                        <div className="text-xs text-muted-foreground">{apt.company}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{apt.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {apt.channel}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMockup;
