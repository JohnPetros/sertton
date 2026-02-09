# Prompt: Criar Plano de Implementação de Spec

**Objetivo:**
Transformar uma especificação técnica em um plano de implementação detalhado e organizado, passo a passo, para guiar o desenvolvimento de forma eficiente e sistemática.

**Entradas:**
- Documento de Spec técnica
- Contexto do projeto (arquitetura, padrões, tecnologias)

**Diretrizes de Execução:**

## 1. Análise da Especificação
- Leia e compreenda completamente a spec fornecida
- Identifique os requisitos funcionais e não-funcionais
- Mapeie as dependências entre componentes
- Identifique riscos e pontos de atenção

## 2. Decomposição Atômica
- Divida o plano fases em tarefas atômicas.
- Cada fase deve resultar em um código compilável e funcional isoladamente.

## 3. Ordem de Execução (Bottom-Up)

Implemente as tarefas seguindo rigorosamente a hierarquia de dependências:

1. **Core**: DTOs, entidades de domínio e interfaces de repositórios/serviços
2. **Data/Rest**: Implementações de interfaces de serviços REST e mapeadores
3. **Data/Drivers**: Implementações de interfaces de drivers (LocalStorage, APIs externas, etc.)
4. **State Management**: Stores (Signals), Presenters, Controllers, ViewModels
5. **UI**: Views, Widgets, Pages e componentes visuais

**Regra fundamental:** Nunca implemente um componente consumidor antes de implementar a lógica/dados que ele consome.
