🏥 ClinicOps — Plataforma SaaS Multi-tenant para Clínicas






Case Técnico desenvolvido para o Processo Seletivo Dizevolv
Plataforma SaaS de Gestão Operacional e Compliance para Clínicas, com foco em segurança, multi-tenancy e governança de dados.

📌 Visão Geral

O ClinicOps é um MVP de plataforma SaaS multi-tenant voltada para clínicas médicas, odontológicas e de saúde integrada.

O sistema foi desenvolvido seguindo rigorosamente o PRD oficial do desafio, simulando um cenário real de produto, com foco em:

Arquitetura SaaS escalável

Isolamento total de dados entre clínicas

Controle de acesso por perfil

Segurança e compliance (LGPD)

🎯 Objetivos do Projeto

Implementar multi-tenancy segura utilizando Row Level Security (RLS)

Garantir isolamento de dados por clínica (tenant)

Desenvolver dashboards distintos por perfil de usuário

Aplicar boas práticas de segurança em aplicações SaaS

Entregar uma aplicação funcional, publicada e acessível

🧱 Arquitetura SaaS Multi-tenant

O ClinicOps adota o modelo Database-per-schema lógico, utilizando:

PostgreSQL (Supabase)

Row Level Security (RLS) em todas as tabelas

Filtro automático por clinica_id

🔐 Isolamento de Dados

Cada requisição é automaticamente filtrada no banco de dados, impedindo que um usuário:

Acesse dados de outra clínica

Modifique registros fora do seu tenant

Esse controle é feito no banco, não apenas no frontend ou backend.

🛡️ Segurança e Compliance

O projeto foi construído seguindo princípios de segurança exigidos para aplicações SaaS:

✅ Row Level Security (RLS) ativo em todas as tabelas

✅ RBAC (Role-Based Access Control)

Admin Master (Plataforma)

Admin Tenant (Clínica)

Usuários Operacionais

✅ Auditoria de ações sensíveis

✅ Proteção de dados sensíveis (LGPD)

✅ Boas práticas de autenticação e autorização


➡ RLS aplicado em 100% das tabelas

🚀 Como executar localmente
1️⃣ Clone o repositório
git clone https://github.com/ThiagoSLeis/clinicops.git
cd clinicops

2️⃣ Instale as dependências
npm install

3️⃣ Configure as variáveis de ambiente

Crie um arquivo .env.local:

NEXT_PUBLIC_SUPABASE_URL= 
NEXT_PUBLIC_SUPABASE_ANON_KEY= 

4️⃣ Rode o projeto
npm run dev

🌐 Links

🔗 Aplicação em Produção: https://clinicops.vercel.app

💻 Repositório: https://github.com/ThiagoSLeis/clinicops

🧠 Considerações Técnicas

Este projeto foi desenvolvido com foco em:

Fidelidade total ao PRD fornecido

Clareza de arquitetura

Segurança aplicada no nível de banco de dados

Organização e legibilidade do código

Simulação real de um produto SaaS em produção

👨‍💻 Autor

Thiago Santos Leis
Desenvolvedor Full Stack
Entusiasta de arquitetura SaaS, segurança e aplicações escaláveis.