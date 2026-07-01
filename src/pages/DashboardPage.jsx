
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Users, TrendingUp, Plus, Edit, Trash2, Inbox, ShieldCheck, Send, Phone, MessageCircle, MailCheck, CheckCircle, Ban } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext.jsx';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('resumen');
  const [leads, setLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [agents, setAgents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [demoRequests, setDemoRequests] = useState([]);
  const [emailConversations, setEmailConversations] = useState([]);
  const [agentActions, setAgentActions] = useState([]);
  const [marketingCampaigns, setMarketingCampaigns] = useState([]);
  const [doNotContact, setDoNotContact] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();

    const paymentStatus = new URLSearchParams(window.location.search).get('payment');
    if (paymentStatus === 'success') {
      toast.success('Pago recibido. Hemos creado la acción de onboarding.');
    }
  }, []);

  const loadData = async () => {
    try {
      const safeFullList = async (collection, options = {}) => {
        try {
          return await pb.collection(collection).getFullList({ ...options, $autoCancel: false });
        } catch (error) {
          if (error?.status === 404) return [];
          throw error;
        }
      };

      const [
        leadsData,
        appointmentsData,
        agentsData,
        campaignsData,
        demoRequestsData,
        settingsData,
        conversationsData,
        actionsData,
        marketingData,
        doNotContactData,
      ] = await Promise.all([
        safeFullList('leads', { sort: '-created' }),
        safeFullList('appointments', { sort: '-date' }),
        safeFullList('agents'),
        safeFullList('campaigns'),
        safeFullList('demoRequests', { sort: '-created' }),
        safeFullList('companySettings'),
        safeFullList('emailConversations', { sort: '-created' }),
        safeFullList('agentActions', { sort: '-created' }),
        safeFullList('marketingCampaigns', { sort: '-created' }),
        safeFullList('doNotContact', { sort: '-created' }),
      ]);

      setLeads(leadsData);
      setAppointments(appointmentsData);
      setAgents(agentsData);
      setCampaigns(campaignsData);
      setDemoRequests(demoRequestsData);
      setEmailConversations(conversationsData);
      setAgentActions(actionsData);
      setMarketingCampaigns(marketingData);
      setDoNotContact(doNotContactData);
      setSettings(settingsData[0] || null);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('¿Eliminar este lead?')) return;
    try {
      await pb.collection('leads').delete(id, { $autoCancel: false });
      setLeads(leads.filter((l) => l.id !== id));
      toast.success('Lead eliminado');
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const handleToggleAgent = async (agent) => {
    try {
      const updated = await pb.collection('agents').update(
        agent.id,
        { active: !agent.active },
        { $autoCancel: false }
      );
      setAgents(agents.map((a) => (a.id === agent.id ? updated : a)));
      toast.success(`Agente ${updated.active ? 'activado' : 'desactivado'}`);
    } catch (error) {
      toast.error('Error al actualizar agente');
    }
  };

  const handleReviewAction = async (action, status = 'review') => {
    if (action.recordCollection !== 'agentActions') {
      toast.info('Acción marcada para revisión');
      return;
    }

    try {
      const updated = await pb.collection('agentActions').update(
        action.id,
        {
          status,
          approved: status === 'approved',
          requiresApproval: status !== 'approved',
        },
        { $autoCancel: false }
      );
      setAgentActions(agentActions.map((item) => (item.id === action.id ? updated : item)));
      toast.success(status === 'approved' ? 'Acción aprobada' : 'Acción enviada a revisión');
    } catch (error) {
      toast.error('No se pudo actualizar la acción');
    }
  };

  const handleReplyAction = (action) => {
    if (!action.targetEmail && !action.fromEmail) {
      toast.error('No hay email de contacto');
      return;
    }

    const email = action.targetEmail || action.fromEmail;
    const subject = encodeURIComponent('Respuesta CitaLink');
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  const handleCallAction = (action) => {
    if (!action.targetPhone) {
      toast.error('No hay teléfono disponible');
      return;
    }

    window.location.href = `tel:${action.targetPhone}`;
  };

  const handleWhatsAppAction = (action) => {
    const phone = (action.targetPhone || '').replace(/\D/g, '');
    if (!phone) {
      toast.error('No hay teléfono disponible');
      return;
    }

    window.open(`https://wa.me/${phone}`, '_blank', 'noopener,noreferrer');
  };

  const handleOptOutAction = async (action) => {
    const email = action.targetEmail || action.fromEmail;
    if (!email && !action.targetPhone) {
      toast.error('No hay contacto para bloquear');
      return;
    }

    try {
      await pb.collection('doNotContact').create(
        {
          email: email || '',
          phone: action.targetPhone || '',
          reason: 'Baja registrada desde Inbox IA',
          source: action.sourceCollection || 'dashboard',
          active: true,
        },
        { $autoCancel: false }
      );
      setDoNotContact([
        {
          id: `local-${Date.now()}`,
          email: email || '',
          phone: action.targetPhone || '',
          reason: 'Baja registrada desde Inbox IA',
          source: action.sourceCollection || 'dashboard',
          active: true,
        },
        ...doNotContact,
      ]);
      await handleReviewAction(action, 'blocked');
      toast.success('Contacto añadido a No contactar');
    } catch (error) {
      toast.error('No se pudo registrar la baja');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'border border-white/10 bg-background/60 text-muted-foreground',
      contacted: 'border border-primary/20 bg-primary/10 text-primary',
      qualified: 'border border-primary/20 bg-primary/10 text-primary',
      lost: 'border border-white/10 bg-muted/60 text-muted-foreground',
      confirmed: 'border border-primary/20 bg-primary/10 text-primary',
      pending: 'border border-white/10 bg-muted/60 text-muted-foreground',
      cancelled: 'border border-destructive/30 bg-destructive/10 text-red-100',
      sent: 'border border-primary/20 bg-primary/10 text-primary',
      draft: 'border border-white/10 bg-muted/60 text-muted-foreground',
      review: 'border border-accent/30 bg-accent/10 text-rose-100',
      blocked: 'border border-destructive/30 bg-destructive/10 text-red-100',
      approved: 'border border-primary/20 bg-primary/10 text-primary',
      failed: 'border border-destructive/30 bg-destructive/10 text-red-100',
      smtp_missing: 'border border-accent/30 bg-accent/10 text-rose-100',
      blocked_missing_legal_basis: 'border border-destructive/30 bg-destructive/10 text-red-100',
      ready_for_review: 'border border-accent/30 bg-accent/10 text-rose-100',
    };
    return colors[status] || 'border border-white/10 bg-muted/60 text-muted-foreground';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  const reviewAgentActions = agentActions
    .filter((action) => action.requiresApproval || action.status === 'review' || action.status === 'blocked')
    .map((action) => ({
      ...action,
      recordCollection: 'agentActions',
    }));
  const demoRequestActions = demoRequests
    .filter((request) => {
      const status = request.notificationStatus || request.status;
      return request.requiresApproval || ['smtp_missing', 'failed', 'blocked'].includes(status);
    })
    .map((request) => ({
      id: `demo-${request.id}`,
      agentName: request.classification === 'baja' ? 'Compliance Agent' : 'Demo Agent',
      status: request.notificationStatus || request.status || 'review',
      summary:
        request.aiSummary ||
        `Solicitud de demo de ${request.company || request.name || request.email || 'nuevo lead'}.`,
      requiresApproval: true,
      recordCollection: 'demoRequests',
      sourceCollection: 'demoRequests',
      sourceRecordId: request.id,
      targetEmail: request.email,
      targetPhone: request.phone,
      targetName: request.name,
    }));
  const pendingActions = [...reviewAgentActions, ...demoRequestActions].slice(0, 6);
  const demoInboxItems = demoRequests.map((request) => ({
    id: `demo-${request.id}`,
    fromEmail: request.email,
    toEmail: 'pat@citalink.es',
    direction: 'demo web',
    subject: `Demo: ${request.company || request.name || 'Nuevo lead'}`,
    intent: request.classification || 'demo',
    status: request.notificationStatus || request.status || 'pending',
  }));
  const visibleInboxItems = emailConversations.length > 0 ? emailConversations : demoInboxItems;
  const visibleCampaigns = marketingCampaigns.length > 0 ? marketingCampaigns : campaigns;
  const outboundEmails = emailConversations.filter((conversation) => conversation.direction === 'outbound' || conversation.status === 'sent').length;
  const inboundEmails = emailConversations.filter((conversation) => conversation.direction === 'inbound').length;
  const responseRate = outboundEmails > 0 ? `${Math.min(100, (inboundEmails / outboundEmails) * 100).toFixed(1)}%` : '0%';

  const kpis = [
    { label: 'Demos recibidas', value: demoRequests.length, icon: Users, color: 'text-primary' },
    { label: 'Emails enviados', value: outboundEmails, icon: MailCheck, color: 'text-primary' },
    { label: 'Tasa respuesta', value: responseRate, icon: TrendingUp, color: 'text-accent' },
    { label: 'Acciones IA', value: reviewAgentActions.length + demoRequestActions.length, icon: Inbox, color: 'text-foreground/80' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - CitaLink</title>
        <meta name="description" content="Panel de control de CitaLink para gestión de leads, citas, agentes y campañas." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-muted/30 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Bienvenido, {currentUser?.name || currentUser?.email}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 h-auto">
                <TabsTrigger value="resumen">Resumen</TabsTrigger>
                <TabsTrigger value="inbox">Inbox IA</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="citas">Citas</TabsTrigger>
                <TabsTrigger value="agentes">Agentes</TabsTrigger>
                <TabsTrigger value="campanas">Campañas</TabsTrigger>
                <TabsTrigger value="ajustes">Ajustes</TabsTrigger>
              </TabsList>

              <TabsContent value="resumen" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {kpis.map((kpi, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
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
                      <CardTitle>Leads recientes</CardTitle>
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
                          {leads.slice(0, 5).map((lead) => (
                            <TableRow key={lead.id}>
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
                              <TableCell className="text-right font-semibold">{lead.score || 0}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Próximas citas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Lead</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {appointments.slice(0, 5).map((apt) => (
                            <TableRow key={apt.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-sm">{apt.leadName}</div>
                                  <div className="text-xs text-muted-foreground">{apt.company}</div>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm">{new Date(apt.date).toLocaleDateString('es-ES')}</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className={getStatusColor(apt.status)}>
                                  {apt.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="inbox" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Inbox IA</CardTitle>
                        <Badge variant="outline">{visibleInboxItems.length} elementos</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Contacto</TableHead>
                            <TableHead>Asunto</TableHead>
                            <TableHead>Intención</TableHead>
                            <TableHead>Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {visibleInboxItems.slice(0, 8).map((conversation) => (
                            <TableRow key={conversation.id}>
                              <TableCell>
                                <div className="font-medium text-sm">{conversation.fromEmail || conversation.toEmail}</div>
                                <div className="text-xs text-muted-foreground">{conversation.direction || 'entrante'}</div>
                              </TableCell>
                              <TableCell className="max-w-xs truncate">{conversation.subject}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{conversation.intent || 'pendiente'}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className={getStatusColor(conversation.status)}>
                                  {conversation.status || 'draft'}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {visibleInboxItems.length === 0 && (
                        <div className="py-8 text-center text-sm text-muted-foreground">
                          Las conversaciones aparecerán aquí cuando lleguen demos o emails conectados.
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Send className="w-4 h-4" />
                          Revisión humana
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {pendingActions.map((action) => (
                          <div key={action.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <span className="font-medium text-sm">{action.agentName || 'Agente IA'}</span>
                              <Badge variant="secondary" className={getStatusColor(action.status)}>
                                {action.status || 'review'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-3">{action.summary}</p>
                            <div className="mt-3 grid grid-cols-5 gap-1">
                              <Button variant="outline" size="icon" title="Responder" onClick={() => handleReplyAction(action)}>
                                <MailCheck className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="outline" size="icon" title="Revisar borrador" onClick={() => handleReviewAction(action, 'review')}>
                                <CheckCircle className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="outline" size="icon" title="Llamar" onClick={() => handleCallAction(action)}>
                                <Phone className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="outline" size="icon" title="WhatsApp" onClick={() => handleWhatsAppAction(action)}>
                                <MessageCircle className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="outline" size="icon" title="Baja" onClick={() => handleOptOutAction(action)}>
                                <Ban className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {pendingActions.length === 0 && (
                          <p className="text-sm text-muted-foreground">No hay borradores pendientes de aprobación.</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <ShieldCheck className="w-4 h-4" />
                          No contactar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{doNotContact.filter((item) => item.active !== false).length}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Contactos excluidos de campañas y respuestas comerciales.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="leads" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Gestión de leads</CardTitle>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Añadir lead
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Próxima acción</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.company}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{lead.email}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={getStatusColor(lead.status)}>
                                {lead.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold">{lead.score || 0}</TableCell>
                            <TableCell className="text-sm">{lead.nextAction}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteLead(lead.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="citas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Gestión de citas</CardTitle>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva cita
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Lead</TableHead>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Canal</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Notas</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((apt) => (
                          <TableRow key={apt.id}>
                            <TableCell className="font-medium">{apt.leadName}</TableCell>
                            <TableCell>{apt.company}</TableCell>
                            <TableCell>{new Date(apt.date).toLocaleDateString('es-ES')}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{apt.channel}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={getStatusColor(apt.status)}>
                                {apt.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {apt.notes}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="agentes" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agents.map((agent) => (
                    <Card key={agent.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <Badge variant="secondary" className="mt-2">
                              {agent.channel}
                            </Badge>
                          </div>
                          <Switch checked={agent.active} onCheckedChange={() => handleToggleAgent(agent)} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Tipo:</span>
                            <span className="ml-2 font-medium">{agent.type}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Tono:</span>
                            <span className="ml-2 font-medium">{agent.tone}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Objetivo:</span>
                            <p className="mt-1">{agent.objective}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Horario:</span>
                            <span className="ml-2 font-medium">{agent.workingHours}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="campanas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Campañas de marketing</CardTitle>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva campaña
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Sector</TableHead>
                          <TableHead>Canal</TableHead>
                          <TableHead>Compliance</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Leads</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visibleCampaigns.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>{campaign.sector}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{campaign.channel}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={getStatusColor(campaign.complianceStatus)}>
                                {campaign.complianceStatus || 'pendiente'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                                {campaign.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-semibold">{campaign.leadsCount || campaign.targetCount || 0}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ajustes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de empresa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Nombre de empresa</Label>
                        <Input
                          id="companyName"
                          defaultValue={settings?.companyName || ''}
                          className="text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Email de contacto</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          defaultValue={settings?.contactEmail || 'pat@citalink.es'}
                          className="text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessHours">Horario comercial</Label>
                        <Input
                          id="businessHours"
                          defaultValue={settings?.businessHours || ''}
                          placeholder="Ej: Lunes a Viernes 9:00-18:00"
                          className="text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPolicy">Política de contacto</Label>
                        <Textarea
                          id="contactPolicy"
                          rows={4}
                          defaultValue={settings?.contactPolicy || ''}
                          placeholder="Describe tu política de contacto con leads..."
                          className="text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <Button type="submit">Guardar cambios</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default DashboardPage;
