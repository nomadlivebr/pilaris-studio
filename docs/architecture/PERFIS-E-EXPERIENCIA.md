# Perfis e experiência por tipo de usuário

**Status:** proposta para validar antes da Fase 2. Este documento descreve comportamento esperado; não altera permissões implementadas. O produto ainda está na Fase 1 e autenticação, guards e módulos de negócio estão planejados para a Fase 2.

## Resumo da proposta

Manter uma única agenda do estúdio como fonte de verdade e oferecer visões diferentes conforme o perfil. A interface administrativa continua sendo a área de gestão. Colaboradores acessam uma área operacional focada em suas aulas e tarefas; alunos acessam uma área pessoal focada em seus próprios agendamentos e em horários que podem reservar. A agenda não deve significar que todos veem os mesmos dados: disponibilidade e eventos são filtrados por perfil e vínculo.

## Perfis existentes no projeto

O banco e o pacote compartilhado já definem `OWNER`, `ADMIN`, `INSTRUCTOR`, `RECEPTIONIST` e `STUDENT`. O vínculo `StudioMembership` associa um usuário a um estúdio e a um perfil, com no máximo um vínculo por usuário/estúdio. Assim, a mesma pessoa pode ter perfis diferentes em estúdios diferentes, mas hoje não pode ter dois perfis simultâneos no mesmo estúdio.

| Perfil | Interface inicial sugerida | Responsabilidade |
| --- | --- | --- |
| Proprietário (`OWNER`) | Administração | Gestão integral do estúdio, usuários e configurações críticas. |
| Administrador (`ADMIN`) | Administração | Operação e gestão diária, com permissões administrativas. Ações financeiras e de acesso podem ser limitadas por política do estúdio. |
| Professor (`INSTRUCTOR`) | Área do colaborador | Agenda própria, turmas atribuídas, lista de alunos da turma, chamada e informações necessárias à aula. |
| Recepção (`RECEPTIONIST`) | Área do colaborador | Agenda operacional, criação e remarcação de aulas/alunos, confirmações e atendimento. Sem acesso automático a relatórios financeiros detalhados ou configurações críticas. |
| Aluno (`STUDENT`) | Área do aluno | Próximas aulas, horários disponíveis, reservas/cancelamentos conforme regras, histórico pessoal e avisos. |

“Colaborador” é uma categoria de interface, não um perfil novo: pode representar professor e recepção. Caso exista outro tipo de colaborador, como fisioterapeuta ou gerente, validar se as permissões cabem nesses perfis ou se será necessário novo papel.

## O que cada pessoa vê na agenda

Todos os clientes consomem os mesmos registros de aulas/agendamentos do estúdio, usando o fuso horário configurado no próprio estúdio. A API filtra o resultado no servidor; esconder itens no menu não é controle de acesso.

| Informação | Proprietário / administrador | Professor | Recepção | Aluno |
| --- | --- | --- | --- | --- |
| Horário, modalidade, sala e capacidade | Todas as turmas | Turmas atribuídas e disponibilidade operacional necessária | Todas as turmas | Horários com vaga e próprios compromissos |
| Nome/lista de alunos de uma turma | Conforme necessidade administrativa | Alunos das turmas atribuídas | Conforme atendimento necessário | Apenas o próprio nome/compromisso; nunca lista dos demais |
| Ocupação da turma | Contagem e lista conforme acesso | Contagem e lista da turma atribuída | Contagem para operação | Estado de disponibilidade, por exemplo “Vagas disponíveis” ou “Lotada” |
| Dados de contato e observações privadas | Acesso administrativo controlado | Só dados estritamente necessários às aulas atribuídas | Só dados necessários ao atendimento | Os próprios dados, conforme política |
| Criar/alterar/cancelar aula | Sim | Não por padrão; permitir mudanças operacionais próprias somente se decidido | Sim, dentro das regras | Solicitar reserva/cancelamento dentro da janela permitida |
| Consultar financeiro | Sim, conforme política | Não | Ações de cobrança restritas, se necessárias; sem visão financeira ampla | Apenas cobranças e plano próprios, se incluídos no produto |

**Regra de privacidade recomendada:** ao aluno, não expor nomes de outros alunos, contatos, observações de saúde, presença ou detalhes de reservas alheias. Em agenda compartilhada, mostrar a turma e sua disponibilidade, não a lista de participantes. Para professor e recepção, limitar dados pessoais ao contexto e à tarefa autorizados.

## Interfaces propostas

### Administração

Preservar o dashboard atual como painel administrativo. O menu atual reúne agenda, alunos, colaboradores, usuários, estúdios, avaliações, financeiro, relatórios e configurações. Essa amplitude faz sentido para quem administra; não deve ser a primeira tela de professor, recepção ou aluno. Proprietário e administrador podem ter permissões distintas mesmo compartilhando a mesma estrutura de interface.

### Colaborador

Tela inicial com “Minha agenda de hoje”, próximos compromissos, turmas atribuídas e avisos de alteração. Professor pode abrir uma turma para consultar lista autorizada e registrar presença; recepção ganha atalhos de operação e atendimento. O calendário pode permitir alternar entre dia/semana e filtrar por sala, modalidade ou professor, mas a visão padrão do professor deve priorizar sua própria agenda.

### Aluno

Tela inicial com próxima aula, ação de reservar horário, agenda pessoal e avisos. Em “Horários disponíveis”, mostrar modalidade, horário, professor (se aprovado pelo estúdio), local e disponibilidade, sem participantes. A reserva deve confirmar elegibilidade (plano ativo, vaga e regras de antecedência/cancelamento) no servidor. Se reservas online não fizerem parte do escopo, a agenda pode ser somente leitura com contato da recepção.

As áreas podem compartilhar componentes visuais e a mesma API de agenda, mas cada uma deve ter navegação, conteúdo inicial e operações adequadas ao perfil. O app mobile atual é uma base potencial para aluno e professor; validar se a área administrativa seguirá exclusivamente web.

## Como atribuir perfis aos usuários

1. Proprietário/admin cadastra ou convida uma pessoa com e-mail. A identidade global `User` não é, por si só, autorização para acessar os dados do estúdio.
2. Ao aceitar convite/criar conta, criar um `StudioMembership` com o estúdio, perfil e status do vínculo. O modelo atual ainda não prevê status, convite, expiração ou auditoria; recomendação: projetá-los para a Fase 2.
3. Criar ou associar o cadastro operacional correspondente: colaborador/professor para `INSTRUCTOR` ou `RECEPTIONIST`, aluno para `STUDENT`. Vincular o cadastro à identidade de login sem duplicar nome/e-mail como fonte de verdade.
4. No login e em cada requisição, resolver estúdio ativo e associação; autorizar no backend por papel, recurso e vínculo específico (por exemplo, professor só altera presença de turma atribuída; aluno só cancela a própria reserva).
5. Mudanças de função devem ser feitas por pessoa autorizada, registradas em auditoria e aplicadas a novas sessões/requisições. Desativar o vínculo deve remover o acesso daquele estúdio sem apagar o histórico operacional.

Convites devem ser vinculados ao estúdio e ao papel pretendido, expirar e exigir autenticação do e-mail. O primeiro acesso não deve permitir ao usuário escolher ou elevar o próprio perfil. Uma conta pode pertencer a mais de um estúdio, com associação separada em cada um.

## Quando há mais de um estúdio

No modelo atual, cada `Studio` é um espaço independente de dados (tenant). Portanto, agenda, aulas, cadastros de alunos, colaboradores, configurações, planos e movimentações pertencem a um estúdio específico e não se misturam automaticamente. A agenda exibida depois de selecionar um estúdio é a agenda daquele estúdio. Se dois estúdios tiverem aulas no mesmo horário, são dois eventos distintos; não existe uma agenda global compartilhada por padrão.

Uma mesma conta (`User`, identificada pelo e-mail) pode estar associada a vários estúdios. O acesso e o perfil são determinados separadamente por `StudioMembership` em cada um. Por exemplo:

| Conta | Estúdio selecionado | Perfil e dados acessíveis |
| --- | --- | --- |
| Ana | Unidade Centro | `INSTRUCTOR`; agenda e turmas atribuídas no Centro |
| Ana | Unidade Norte | `RECEPTIONIST`; agenda operacional da Norte, sem acesso às turmas privadas do Centro por essa associação |
| Bruno | Unidade Centro | `STUDENT`; disponibilidade pública de aulas e seus próprios agendamentos no Centro |
| Bruno | Unidade Norte | Sem associação; nenhum dado da Norte |

No início da sessão, se houver mais de uma associação, a interface deve pedir que a pessoa escolha o estúdio (ou abrir o último usado, mantendo uma troca de estúdio visível). O cabeçalho deve sempre mostrar o estúdio ativo. Toda navegação, busca e operação passa a usar esse contexto. Ao trocar de estúdio, atualizar a agenda, listas, filtros e ações permitidas; limpar seleções e dados em cache do contexto anterior para não mostrar informações da unidade anterior. A API deve confirmar a associação do usuário ao estúdio ativo em toda requisição; não basta confiar no identificador que o navegador envia.

### Quem é o mesmo e o que é separado

- **Identidade/login:** pode ser a mesma conta global, com um único e-mail e credencial.
- **Papel:** atribuído por estúdio; pode variar entre estúdios. No modelo atual é um papel por pessoa por estúdio.
- **Vínculo de colaborador:** uma pessoa pode trabalhar em uma ou várias unidades. O perfil de acesso não deve, sozinho, definir para quais turmas ela está escalada; a atribuição de colaborador às unidades/turmas precisa ser representada nos registros operacionais.
- **Cadastro de aluno:** recomendação inicial é manter matrícula, plano, dados de atendimento e histórico por estúdio. A mesma pessoa pode usar uma conta única para acessar duas unidades, mas cada estúdio mantém seus próprios dados de matrícula e aulas. Não replicar automaticamente plano, pagamentos, observações ou histórico entre unidades.
- **Agenda:** separada por estúdio. Se o aluno tiver acesso a dois estúdios, oferecer uma visão “Todas as minhas unidades” opcional que agrega apenas seus próprios compromissos, claramente identificados por unidade. Isso é uma visão pessoal, não torna as agendas administrativas compartilhadas.
- **Catálogo compartilhado:** nome da rede, modalidades ou identidade visual podem futuramente ser compartilhados por um grupo de unidades, mas devem ser explicitamente modelados como dados de organização/grupo. O projeto atual não possui entidade de grupo/rede; não presumir que cadastros com mesmo nome são o mesmo registro.

Exemplo concreto: selecionar **Unidade Centro** carrega a agenda e os alunos do Centro. Uma professora que também trabalha na **Unidade Norte** troca a unidade para ver a agenda e turmas da Norte conforme sua associação. Um aluno matriculado nas duas pode alternar unidade ou consultar sua própria agenda consolidada. Um administrador de apenas uma unidade não ganha acesso à outra por pertencer ao mesmo produto.

Para uma primeira versão, recomendo tratar cada estúdio como tenant isolado e permitir associação explícita de usuários a múltiplos estúdios. Se houver necessidade de operação de uma rede inteira (cadastro central, agenda entre unidades, relatórios consolidados), criar depois uma entidade explícita de grupo/organização e permissões próprias, sem enfraquecer o isolamento por `studioId`.

### Ponto de decisão: um papel ou vários por estúdio?

Hoje o banco limita a uma associação por usuário por estúdio. Isso é simples e recomendável para começar; cada usuário recebe o perfil de menor privilégio que atende sua rotina. Se alguém precisar exercer duas funções no mesmo estúdio, há duas opções a validar: permitir múltiplos papéis e calcular a união controlada de permissões, ou criar um papel composto explícito. Evitar contas duplicadas para contornar a limitação. Não ampliar o modelo até surgir um caso real e definir como resolver conflitos e auditoria.

## Recomendações para implementação

- Tratar papel como ponto de partida, não como regra única: autorização deve combinar papel, estúdio, vínculo ao recurso e ação.
- Aplicar escopo por `studioId` em cada consulta e mutação no backend; jamais confiar em `studioId` enviado pelo cliente.
- Disponibilizar seletor de estúdio apenas para associações autorizadas e exigir contexto de estúdio explícito em cada operação; garantir que caches/client state também sejam separados por estúdio.
- Separar permissões de leitura e escrita. Acesso de agenda não implica acesso a cadastro completo, prontuário, avaliações ou financeiro.
- Definir janelas de reserva/cancelamento, lista de espera, faltas, capacidade e política de exibição de professor antes de liberar autoatendimento.
- Adicionar status de associação e trilha de auditoria para convite, troca de papel, suspensão e ações sensíveis.
- Criar navegação por perfil no frontend para clareza, mantendo as mesmas restrições obrigatórias na API.

## Decisões a validar antes da Fase 2

1. Aluno poderá reservar e cancelar sozinho ou apenas consultar a agenda?
2. O professor poderá ver todas as aulas ou somente as próprias turmas? A proposta padrão é somente as próprias.
3. A recepção poderá ver avaliações e dados de saúde? A proposta padrão é não, salvo necessidade explícita e acesso mínimo.
4. Professor e recepção podem ser a mesma pessoa no mesmo estúdio? Se sim, definir múltiplos papéis ou um papel composto antes da modelagem.
5. A agenda do aluno mostrará o nome do professor e o número exato de vagas, ou somente “disponível/lotada”?
6. A conta de proprietário da plataforma (operador SaaS) é separada de `OWNER`, que representa proprietário do estúdio. Não reutilizar o papel do estúdio para administração global da plataforma.

## Validação com o estado atual

- A documentação confirma que o projeto está na Fase 1; módulos de alunos, agenda e financeiro ainda são futuros.
- O enum de papéis existente já distingue administração, professor, recepção e aluno.
- A associação por estúdio permite uma função por usuário/estúdio; não há ainda status de vínculo, convites, autenticação ou guards.
- O dashboard atual mistura navegação administrativa e dados ilustrativos da agenda. O componente “Agenda de hoje” usa dados provisórios e indica explicitamente que aguarda integração com o módulo de agenda.
- Portanto, este relatório é uma proposta de produto e autorização a validar, não descrição de funcionalidades já implementadas.

## Comparativo com Define Pilates (referência instalada)

Foi feita uma inspeção estática do código-fonte em `Projeto-Estudio-Pilates` (React/Vite no frontend e Django/DRF no backend). Não foi iniciada a aplicação nem validado comportamento visual em execução; as observações abaixo descrevem rotas, componentes e modelos encontrados no código.

### Abas e fluxos encontrados

- O projeto separa a entrada por tipo de usuário: administrador master, administrador de unidade, aluno, recepção e instrutor/fisioterapeuta. O redirecionamento inicial envia cada perfil para um dashboard/fluxo próprio.
- A área administrativa possui telas de alunos, colaboradores, usuários, agenda, aulas, horários, bloqueios, modalidades, avaliações, planos, financeiro/pagamentos/vendas, produtos, relatórios e gestão de unidades.
- O aluno tem dashboard e navegação próprios: início, meus agendamentos, avaliações, matrículas, marcar aula, pagamentos e perfil. A tela inicial destaca próxima aula e oferece ação para marcar horário.
- A agenda administrativa oferece seleção de unidade e navegação por datas; as rotas de administração são protegidas por papéis. O dashboard de instrutor aparece no README como roadmap, e a rota inicial de instrutor aponta para a agenda administrativa que está protegida para administradores. A recepção também tem uma rota de atendimento representada por placeholder. Logo, não tratar todos esses fluxos como completos.
- O menu de aluno está efetivamente separado do menu administrativo, um padrão útil para Pilaris: a navegação é menor e orientada à tarefa em vez de reutilizar a sidebar administrativa.

### Modelagem multiunidade encontrada

- O projeto de referência associa alunos a várias unidades (`Aluno.unidades`, relação muitos-para-muitos): um cadastro de aluno pode estar presente em mais de uma unidade.
- Colaboradores também podem estar em várias unidades. A associação `ColaboradorStudio` liga colaborador, unidade e função/permissão operacional, permitindo um papel operacional por vínculo explícito à unidade.
- A agenda administrativa carrega uma lista de unidades e filtra aulas. No viewmodel examinado, todas as aulas são obtidas e depois filtradas no cliente pela data e pelo **nome** da unidade. Esse é um padrão a evitar no Pilaris: a API deve receber/derivar a unidade autorizada e filtrar por ID no servidor, retornando somente dados necessários.
- A tela de aluno recebe `studioId` opcional na URL, mas a dashboard também mostra a próxima aula com unidade; isso sugere uma experiência pessoal que pode cruzar unidades. Há, porém, uma tela de seleção de estúdio ainda em placeholder, então o fluxo não está totalmente fechado.

### O que aproveitar e o que melhorar no Pilaris

| Referência | Direção para Pilaris |
| --- | --- |
| Menus e dashboards distintos por perfil | Adotar áreas e navegação próprias para admin, colaborador e aluno, preservando identidade visual comum. |
| Aluno vinculado a múltiplas unidades | Considerar um perfil de pessoa/aluno global ligado à conta, com matrículas e dados operacionais por estúdio. A decisão precisa separar dados compartilháveis (identidade e contato) de dados locais (plano, avaliações, presença, observações e pagamentos). |
| Colaborador com vínculo explícito a unidade e função | Não basta criar uma associação de login ao estúdio: modelar também em quais estúdios a pessoa trabalha e suas atribuições de turma. Como primeiro corte, um papel de acesso por estúdio continua simples; funções/turmas operacionais podem ter vínculos próprios. |
| Agenda com seletor de unidade | Usar seletor claramente visível para administrador com várias unidades autorizadas; URLs/estado usam ID e API verifica o vínculo. Para professor, mostrar unidades/turmas atribuídas. Para aluno, listar apenas unidades com matrícula e compromissos próprios. |
| Muitas telas e cadastros detalhados | Agrupar no Pilaris por tarefas e frequência, mantendo módulos avançados em subseções. Evitar colocar cada operação como item principal do menu. |
| Dados globais buscados e filtrados no frontend | Não reproduzir. A API do Pilaris deve filtrar e autorizar antes de responder; isso reduz exposição entre unidades e transferência de dados desnecessários. |

### Ajuste recomendado à proposta multiestúdio

A proposta anterior de manter matrículas e históricos por estúdio continua válida, mas é útil separar **pessoa** de **vínculo local**. Uma conta global pode representar a mesma pessoa em mais de um estúdio, enquanto cada estúdio mantém matrícula, plano, agendamentos, presenças, avaliações clínicas e dados financeiros próprios. Informações básicas de identidade podem ser reaproveitadas com vínculo explícito e consentimento/política definida; isso não deve fazer os estúdios enxergarem automaticamente os dados uns dos outros.

Para colaborador, a conta global também pode ser a mesma, mas escala, papel operacional e turmas são vínculos por estúdio. Exemplo: a professora Ana usa um login e aparece em Centro e Norte; cada unidade atribui suas próprias aulas e permissões. A agenda consolidada de trabalho pode ser uma visão pessoal opcional, claramente marcada por unidade, sem conceder ao administrador de uma unidade acesso aos dados da outra.

No Pilaris atual, `StudioMembership` já suporta uma identidade global com associação e papel por estúdio, mas ainda não existem modelos de aluno, colaborador, matrícula ou atribuição a turma. Antes de criá-los, decidir explicitamente se aluno e colaborador são cadastros globais com relações locais, ou registros locais vinculados à identidade global. A recomendação é: identidade e autenticação globais; dados operacionais e autorização locais ao estúdio.

## Cronograma sugerido para começar a implementação

Este roteiro ordena o trabalho por dependência e risco: primeiro garantir quem pode acessar qual estúdio; depois criar dados operacionais; por fim abrir as experiências por perfil. Estimativa para **uma pessoa desenvolvedora em dedicação principal**, sem contar espera por decisões, conteúdo, revisão de design ou implantação. São faixas de planejamento, não compromisso de prazo. O sistema está na Fase 1, então uma versão com agenda real exige módulos novos de backend e frontend.

### Etapa 0 — Fechar o recorte do MVP (1–2 dias)

Antes de codificar os módulos, decidir e registrar:

1. O MVP vai entregar primeiro administração e professor, ou administração, professor e aluno?
2. Aluno pode reservar/cancelar ou só consultar e pedir à recepção?
3. Professor vê apenas suas próprias turmas? Recomendação: sim.
4. Um usuário pode acumular dois papéis no mesmo estúdio? Recomendação inicial: não; funções operacionais podem ter vínculos separados.
5. Matrícula, plano, avaliações, pagamentos e presença serão por unidade? Recomendação: sim.
6. Qual papel pode convidar usuários, trocar perfis e selecionar múltiplos estúdios?

**Entrega:** decisões de escopo anotadas e fluxo de cada perfil em uma página. Sem isso, é fácil criar permissões incompatíveis com a navegação.

### Etapa 1 — Fundação de identidade e estúdio ativo (3–6 dias)

1. Implementar autenticação e sessão, pois os guards e o contexto de usuário são pré-requisitos para filtrar dados.
2. Criar endpoint que retorna os estúdios e papéis associados à pessoa autenticada.
3. Criar seleção de estúdio ativo para quem tem mais de um vínculo e indicar a unidade ativa no cabeçalho.
4. Resolver `TenantContext` a partir da sessão e da unidade autorizada no backend; não aceitar como verdade `studioId` arbitrário do navegador.
5. Definir comportamento de 401/403, associação suspensa e conta sem estúdio.

**Pontos de partida existentes:** `database/schema/schema.prisma` já tem `User` e `StudioMembership`; `packages/shared/src/auth/user-role.ts` enumera os perfis; `server/services/src/tenancy/tenant-context.ts` oferece `TenantContext` e `scopeToStudio`; `apps/web/src/components/layout/app-header.tsx` e `apps/web/src/config/navigation.ts` são pontos de entrada para seletor e navegação. Esses elementos são fundação, não autenticação/controle de acesso completos.

**Entrega:** usuário autenticado recebe somente sua lista de estúdios autorizados e consegue operar com contexto explícito de uma unidade.

### Etapa 2 — Autorização na API e segurança de tenant (3–6 dias)

1. Implementar guards/decorators ou política central de autorização para papel, estúdio e ação.
2. Aplicar escopo do estúdio em toda consulta/mutação de negócio.
3. Validar também vínculos com o recurso: professor só altera turma atribuída; aluno só consulta ou altera o próprio agendamento.
4. Padronizar erros de acesso e registrar mudanças sensíveis de papel/associação.
5. Conferir que trocar o ID de uma URL ou payload não permite acessar outro estúdio.

**Ponto de partida:** `scopeToStudio` ajuda a compor filtros, mas sozinho não confirma que o usuário pertence ao estúdio nem se pode executar aquela ação. A autorização precisa ocorrer antes de consultas e mutações nos serviços/controladores.

**Entrega:** isolamento validado na API antes de adicionar dados reais de alunos, agenda ou financeiro. Esta etapa tem prioridade alta porque uma falha pode vazar dados entre unidades.

### Etapa 3 — Modelos de negócio mínimos (4–8 dias)

Implementar apenas as entidades necessárias para a agenda, sem antecipar financeiro/avaliações:

1. Perfil de pessoa/aluno e vínculo/matrícula por estúdio.
2. Perfil de colaborador e associação a estúdios.
3. Modalidade/sala, turma ou horário recorrente e ocorrência de aula.
4. Atribuição de professor a turma/ocorrência.
5. Reserva/agendamento e capacidade da aula.

Cada entidade operacional terá `studioId`; unicidades de negócio devem incluir estúdio. Definir como a identidade global de login se liga a cada cadastro local. Criar migrations versionadas a partir de `database/schema/schema.prisma` e contratos compartilhados em `packages/shared`.

**Entrega:** dados reais suficientes para criar uma aula, listar vagas e associar professor/aluno dentro de uma unidade.

### Etapa 4 — Agenda administrativa e do colaborador (5–9 dias)

1. Criar endpoints de agenda por intervalo de datas e estúdio, já filtrados e autorizados no servidor.
2. Implementar a agenda administrativa: lista/calendário, filtros e criação/edição/cancelamento de aula.
3. Implementar visão do professor: agenda própria, detalhes mínimos da turma e chamada, se chamada estiver no MVP.
4. Implementar visão da recepção separadamente se fizer parte do recorte, com operações de atendimento autorizadas.
5. Garantir fuso horário do estúdio e estados de vaga/lotação.

**Pontos de partida:** `apps/web/src/config/navigation.ts` e `apps/web/src/app/router.tsx` hoje apontam os módulos para placeholders; `apps/web/src/features/dashboard/components/today-schedule.tsx` usa dados provisórios. Substituir esse mock somente quando o contrato de API e os modelos estiverem definidos.

**Entrega:** uma agenda real, fonte única de eventos por estúdio e diferentes recortes para administração, professor e recepção.

### Etapa 5 — Área do aluno (4–7 dias)

1. Criar uma navegação e início próprios, sem menu administrativo.
2. Mostrar próximos compromissos e horários disponíveis em estúdios nos quais o aluno tem vínculo.
3. Ocultar dados de outros alunos; exibir somente modalidade, horário, unidade, professor (se permitido) e disponibilidade.
4. Se reservas estiverem no MVP, validar no backend matrícula/plano elegível, capacidade e regras de antecedência/cancelamento; impedir duplicidade e concorrência na última vaga.
5. Se reservas não estiverem no MVP, oferecer consulta e instrução clara para contato com a recepção.

**Entrega:** aluno vê a própria agenda e disponibilidade autorizada, inclusive com identificação de unidade quando tiver mais de uma.

### Etapa 6 — Acabamento e preparação de lançamento (2–5 dias)

Revisar fluxos vazios, carregamento, erros, mobile/responsividade, acessibilidade básica, trilha de auditoria e dados legados. Validar isolamento entre estúdios e permissões por papel em todos os endpoints e telas. Preparar seeds/massa de demonstração e documentação de operação.

### Ordem prática de início

Se for começar hoje, atacar nesta ordem:

1. **Escrever as seis decisões do MVP** acima e escolher a primeira entrega de usuário.
2. **Desenhar autenticação + seleção de estúdio + contexto ativo** antes da agenda.
3. **Fechar autorização do backend e isolamento por `studioId`** antes de cadastrar dados reais.
4. **Modelar aluno, colaborador, turma e agendamento** com as relações locais/global definidas.
5. **Entregar agenda administrativa real**; ela valida os modelos e vira a fonte comum de calendário.
6. **Entregar a visão de professor**, que é uma filtragem operacional da mesma agenda.
7. **Entregar aluno e autoagendamento** depois de definir regras comerciais e privacidade.
8. **Só então expandir** financeiro, avaliações, relatórios e centralização de rede.

### Faixa de prazo por escopo

| Escopo | Estimativa para uma pessoa |
| --- | ---: |
| Base segura: autenticação, seleção de estúdio, autorização e modelos iniciais | 10–20 dias úteis |
| MVP de agenda: base segura + agenda admin + professor/recepção | 18–34 dias úteis |
| MVP com área do aluno e reserva/cancelamento | 24–46 dias úteis |

As faixas incluem implementação e integração em nível inicial, não certificação de segurança, migração de uma base de produção nem lançamento nas lojas. Com mais pessoas, o calendário pode encurtar se backend, web e produto forem trabalhados em paralelo após os contratos estarem acordados; dividir antes da fundação tende a gerar retrabalho.
