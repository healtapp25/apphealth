# 🚀 Deploy Guide - APPHEALTH

Este guia te ajudará a fazer deploy do projeto APPHEALTH no GitHub, Supabase e Render.

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no Supabase
- Conta no Render
- Git instalado localmente

## 🗂️ Estrutura do Projeto

O projeto foi configurado como **monorepo** com separação clara entre frontend e backend:

```
APPHEALTH/
├── app/                    # Next.js App Router
├── components/             # Componentes React
├── pages/                  # Páginas da aplicação
├── entities/               # Entidades e lógica de dados
│   ├── all.js             # Classes principais
│   └── supabase.js        # Configuração Supabase
├── supabase/              # Schema do banco
│   └── schema.sql         # Estrutura das tabelas
├── utils/                 # Funções utilitárias
└── render.yaml           # Configuração do Render
```

## 🔧 Passo 1: Configurar Supabase

### 1.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie um novo projeto
4. Anote a **URL** e **anon key** do projeto

### 1.2 Executar Schema

1. No painel do Supabase, vá em **SQL Editor**
2. Cole o conteúdo do arquivo `supabase/schema.sql`
3. Execute o script para criar as tabelas

### 1.3 Configurar Autenticação

1. Vá em **Authentication > Settings**
2. Configure os providers desejados (Email, Google, etc.)
3. Configure as URLs de redirect para seu domínio

## 🐙 Passo 2: Subir para GitHub

### 2.1 Inicializar Repositório

```bash
cd c:\Users\Lucas\Desktop\APPHEALTH
git init
git add .
git commit -m "Initial commit: APPHEALTH project"
```

### 2.2 Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `apphealth-frontend`
4. Marque como público ou privado
5. NÃO inicialize com README (já temos)

### 2.3 Conectar e Push

```bash
git remote add origin https://github.com/SEU_USUARIO/apphealth-frontend.git
git branch -M main
git push -u origin main
```

## 🌐 Passo 3: Deploy no Render

### 3.1 Conectar Repositório

1. Acesse [render.com](https://render.com)
2. Clique em "New +"
3. Selecione "Web Service"
4. Conecte seu repositório GitHub

### 3.2 Configurar Deploy

- **Name**: `apphealth-frontend`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Free (ou pago se preferir)

### 3.3 Configurar Variáveis de Ambiente

No painel do Render, adicione estas variáveis:

```
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_do_supabase
NEXT_PUBLIC_APP_URL=https://seu-app.onrender.com
```

## 🔄 Passo 4: Deploy Automático

### 4.1 Configurar Webhook (Opcional)

1. No Supabase, vá em **Settings > API**
2. Configure webhooks para sincronizar dados
3. Use a URL do seu app no Render

### 4.2 Auto-Deploy

O Render fará deploy automático a cada push no branch `main`.

## 🧪 Passo 5: Testar Deploy

### 5.1 Verificar Funcionalidades

- [ ] Aplicação carrega corretamente
- [ ] Autenticação funciona
- [ ] Dados são salvos no Supabase
- [ ] Todas as páginas funcionam
- [ ] Design responsivo está ok

### 5.2 Monitorar Logs

- No Render: **Logs** tab
- No Supabase: **Logs** section

## 🔧 Comandos Úteis

### Deploy Manual
```bash
# Fazer alterações
git add .
git commit -m "Descrição da alteração"
git push origin main
```

### Verificar Status
```bash
# Ver status do git
git status

# Ver logs do Render
# (via dashboard web)
```

### Rollback
```bash
# Voltar para commit anterior
git revert HEAD
git push origin main
```

## 🛠️ Troubleshooting

### Erro de Build
- Verifique as dependências no `package.json`
- Confirme que todas as variáveis de ambiente estão configuradas

### Erro de Conexão Supabase
- Verifique URL e keys do Supabase
- Confirme que as políticas RLS estão corretas

### Erro 500
- Verifique os logs no Render
- Confirme que o schema do banco está correto

## 📱 URLs Finais

Após o deploy, você terá:

- **Frontend**: `https://seu-app.onrender.com`
- **Backend**: Supabase (automático)
- **Repositório**: `https://github.com/seu-usuario/apphealth-frontend`

## 🎯 Próximos Passos

1. Configurar domínio customizado (opcional)
2. Configurar SSL/HTTPS (automático no Render)
3. Configurar monitoramento
4. Configurar backups automáticos
5. Implementar CI/CD avançado

---

✅ **Projeto pronto para produção!**
