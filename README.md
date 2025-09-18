# APPHEALTH - Aplicação de Saúde e Fitness

Uma aplicação React moderna para acompanhamento de saúde e fitness com sistema de gamificação.

## 📍 Localização do Frontend

O frontend está localizado na estrutura de arquivos do projeto da seguinte forma:

### Estrutura Principal
```
c:\Users\Lucas\Desktop\APPHEALTH\
├── layout.js              # Layout principal da aplicação
├── pages/                 # Páginas da aplicação
│   ├── dashboard.js       # Dashboard principal
│   ├── bmi.js            # Calculadora de IMC
│   ├── goals.js          # Definição de metas
│   ├── history.js        # Histórico de progresso
│   ├── nutrition.js      # Tabela nutricional
│   └── profile.js        # Perfil do usuário
├── components/           # Componentes reutilizáveis
│   ├── dashboard/
│   │   └── dailygoals    # Componente de metas diárias
│   └── gamification/
│       ├── XPBar.js      # Barra de experiência
│       ├── avatar.js     # Avatar do usuário
│       └── levelupanimation.js # Animação de level up
├── entities/             # Entidades e dados
│   ├── all.js           # Exportações centrais das entidades
│   ├── dailyprogress.json
│   ├── food.json
│   ├── usergoal.json
│   └── userlevel.json
└── utils/
    └── index.js         # Funções utilitárias
```

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **React Router** - Navegação entre páginas
- **Framer Motion** - Animações fluidas
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Date-fns** - Manipulação de datas

## 📱 Páginas do Frontend

### 1. Dashboard (`/pages/dashboard.js`)
- Página principal da aplicação
- Exibe progresso diário de água e calorias
- Sistema de XP e níveis
- Avatar evolutivo
- Resumo de estatísticas

### 2. Calculadora IMC (`/pages/bmi.js`)
- Calculadora de Índice de Massa Corporal
- Interface interativa com resultados visuais
- Tabela de classificação do IMC
- Validação de dados de entrada

### 3. Metas (`/pages/goals.js`)
- Definição de metas diárias
- Meta de consumo de água (ml)
- Meta de calorias (kcal)
- Interface de configuração personalizada

### 4. Histórico (`/pages/history.js`)
- Visualização do progresso ao longo do tempo
- Estatísticas consolidadas
- Histórico dos últimos 30 dias
- Indicadores de metas atingidas

### 5. Tabela Nutricional (`/pages/nutrition.js`)
- Base de dados de alimentos
- Filtros por categoria
- Busca por nome
- Informações nutricionais detalhadas

### 6. Perfil (`/pages/profile.js`)
- Gerenciamento de dados pessoais
- Informações corporais (peso, altura)
- Cálculo automático de IMC
- Configurações do usuário

## 🎮 Sistema de Gamificação

### Componentes de Gamificação (`/components/gamification/`)

- **XPBar.js**: Barra de progresso de experiência
- **avatar.js**: Sistema de avatares evolutivos
- **levelupanimation.js**: Animações de subida de nível

### Mecânicas de Jogo
- Sistema de XP por metas atingidas
- 6 níveis de avatar diferentes
- Animações de conquistas
- Progresso visual em tempo real

## 🔧 Componentes UI

### Layout Principal (`layout.js`)
- Sidebar com navegação
- Header responsivo
- Sistema de roteamento
- Design moderno com gradientes

### Componentes Reutilizáveis
- Cards informativos
- Botões interativos
- Barras de progresso
- Formulários estilizados

## 📊 Gerenciamento de Estado

### Entidades (`/entities/`)
- **User**: Gerenciamento de usuários
- **UserGoal**: Metas do usuário
- **DailyProgress**: Progresso diário
- **UserLevel**: Sistema de níveis
- **Food**: Base de alimentos

## 🎨 Design System

### Cores Principais
- **Verde**: `green-600` (primária)
- **Azul**: `blue-600` (secundária)
- **Laranja**: Para calorias
- **Azul claro**: Para água

### Responsividade
- Mobile-first design
- Breakpoints: 768px, 1024px, 1280px
- Layout adaptativo

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 📝 Funcionalidades Principais

✅ **Dashboard interativo** com progresso em tempo real  
✅ **Sistema de gamificação** completo  
✅ **Calculadora de IMC** integrada  
✅ **Definição de metas** personalizadas  
✅ **Histórico detalhado** de progresso  
✅ **Base nutricional** de alimentos  
✅ **Perfil de usuário** completo  
✅ **Design responsivo** e moderno  
✅ **Animações fluidas** com Framer Motion  

## 🔍 Status dos Arquivos

✅ Todos os erros de importação foram corrigidos  
✅ Arquivo `entities/all.js` criado com todas as classes  
✅ Tratamento de erros implementado  
✅ Utilitários organizados em `utils/index.js`  
✅ Package.json configurado com dependências  

O frontend está completamente funcional e pronto para uso!
