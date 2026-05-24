# Vanilla JS - SPA

Single-Page Application (SPA) construído utilizando exclusivamente recursos nativos do navegador.
A aplicação não utiliza bundlers, compiladores ou geranciadores de pacotes.
É o puro suco do JS.

## Princípios de Design

- **Zero build**: O código escrito é exatamente o código executado pelo navegador.
- **Módulos ES Nativos**: Utilização de `import` e `export` suportados nativamente.
- **Clean Architecture**: Separação clara entre infraestrutura e regras de negócio com possível uso de Ports & Adapters.
- **Feature-Driven**: Organização de código estruturada por contexto de negócio, não por tipo de arquivo.

---

## Arquitetura

### 1. Injeção de Dependência (DI Container)

O container em `src/core/container.js` gerencia o ciclo de vida das dependências da aplicação e utiliza um padrão de Lazy Singleton.


### 2. Contrato de Armazenamento (Storage Port)

A 'interface' `src/core/ports/storage.port.js` porta o contrato abstrato de persistência da aplicação.


### 3. Carregamento Dinâmico (Lazy Loading)

Tanto as páginas quanto o registro de serviços do container utilizam a sintaxe nativa de `import()` dinâmico.
O navegador baixa os arquivos que precisa, somente quando precisa e isso otimiza o consumo inicial de memória e tráfego de rede.


### 4. Gerenciamento de Estado e Fluxo de Dados
A interface é governada por um fluxo previsível e unidirecional de dados, utilizando componentes funcionais puros e reatividade isolada no escopo de cada tela:

* **Fluxo Unidirecional (Data Down, Events Up)**: O componente pai detém a fonte única da verdade sobre os dados (o estado/props). Ele repassa os valores iniciais para os componentes filhos (`InputGroupComponent`, `SelectGroupComponent`) e injeta funções de callback (`onInput`, `onChange`). Os componentes filhos não alteram dados; eles apenas capturam eventos nativos do DOM e devolvem os novos valores textuais para o pai.
* **Encapsulamento com Proxy**: No componente pai, o objeto contendo os dados do formulário é envelopado dinamicamente em um `Proxy` nativo.
* **Hidratação Parcial Cirúrgica (Efeito de Estado)**: Para mitigar os gargalos de desempenho e perda de estado de elementos visuais (como a perda de foco do teclado no input durante a digitação), o sistema rejeita re-renderizações totais por `innerHTML`. Em vez disso, o manipulador `set` do `Proxy` delega a reação a uma função centralizada de efeito colateral (ex: `updateUI`). Essa função mapeia referências diretas de nós específicos do DOM e realiza a hidratação e alterações estéticas (ex: alternar a propriedade `display`), modificando apenas os nós afetados.

---

## Estrutura de Pastas

```text
src/
├── config/
│   ├── routes.js           # Arquivo de definição das rotas
├── core/                   # Infraestrutura global e invariável
│   ├── adapters/           # Implementações de infraestrutura (ex: LocalStorage)
│   ├── layouts/            # Templates estruturais de exibição (Público/Privado)
│   ├── ports/              # Contratos e interfaces abstratas
│   ├── container.js        # Gerenciador de Injeção de Dependência
│   └── router.js           # Mecanismo de roteamento baseado no Hash da URL
├── features/               # Domínios isolados da aplicação
│   ├── auth/               # Contexto de autenticação e sessão
│   └── users/              # Contexto de gestão de usuários
└── main.js                 # Ponto de entrada e inicialização do app
```

---

## Guia de Desenvolvimento: Adicionando uma Nova Rota

Para criar e expor uma nova página no sistema, siga o fluxo de três passos abaixo:

### Passo 1: Criar a Página (View)

Crie o arquivo da página dentro da funcionalidade correspondente. As páginas devem retornar um elemento do DOM gerado programaticamente.

Exemplo de página privada protegida em `src/features/dashboard/pages/relatorios.page.js`:

```javascript
export const RelatoriosPage = () => {
    const el = document.createElement("div");

    el.innerHTML = `
    <h1>Relatórios Gerenciais</h1>
    <p>Dados de desempenho do sistema.</p>
    <div style="background: white; padding: 20px; border-radius: 6px;">
      <p>Status operacional: OK</p>
    </div>
  `;

    return el;
};
```

### Passo 2: Mapear a Rota no Roteador Principal

Abra o arquivo de configuração de rotas em `src/config/routes.js` e adicione a nova chave à tabela de roteamento dentro do método de inicialização.
Use a função de `import()` dinâmico para garantir o Lazy Loading e se quiser injetar algum serviço nele, você pode carregar aqui também.

```javascript

'/relatorios': {
  view: async () => {
    const { RelatoriosPage } = await import('@/features/dashboard/pages/relatorios.page.js');
    return RelatoriosPage();
  },
  layout: PrivateLayout, // Utiliza o layout privado com menu lateral
  auth: true             // Bloqueia o acesso caso o usuário não esteja autenticado
}
```

### Passo 3: Adicionar o Link na Navegação

Se a rota for privada, abra o layout correspondente em `src/core/layouts/private.layout.js` e adicione o elemento `<a>` com o prefixo hash (`#`):

```html
<a href="#/relatorios" data-link style="color: white; text-decoration: none;">📊 Relatórios</a>
```

---

## Desenvolvimento Local

Já adianto que não vai funcionar caso você tente abrir o `index.html` direto.
A aplicação depende de Módulos ES carregados diretamente do sistema de arquivos e o navegador bloqueia requisições locais (CORS).

Utilize qualquer servidor HTTP local.

**Python:**

```python
python -m http.server 8000
```

**PHP:**

```php
php -S localhost:8000
```

Acesse no navegador `http://localhost:8000`


## FAQ

**E se você quiser registrar uma dependência que não seja singleton no container?**
*Agora não dá, mas futuramente isso será possível*

**Você é obrigado a usar as supostas interfaces??**
*Ninguém é obrigado a nada com JS, mas usar isso mantém um padrão e facilita a substituição por um storage em memória, sessionStorage, jsonDB..*

**Por que lazy load num SPA? Não é mais fácil baixar tudo de uma vez?**
*Tudo é fácil. Considere essa escolha um tradeoff admitido.*

**Você tem que usar o Proxy sempre que quiser reatividade?**
*Isso é um Vanilla, as coisas são um pouco mais artesanais mesmo. Em breve isso se tornará um helper (que você também não será obrigado a usar).*