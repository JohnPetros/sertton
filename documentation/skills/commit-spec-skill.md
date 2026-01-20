## Atualização e finalização de spec

Sempre que o código da implementação for modificado, verifique se a implementação divergiu do spec original. Também analise se a implementação atendeu à regra de negócio descrita no PRD associado ao spec.

1.  **Consistência:**
    Se a solução implementada for diferente da planejada (ex: mudou o nome de uma classe ou a estratégia de gestão de estado), atualize o documento do spec para refletir a realidade do código ("As Built").

2.  **Refinamento:**
    Se novas alterações invalidaram passos futuros do spec, remova-os ou reescreva-os para se adequarem à nova arquitetura do código.

3.  **Atualização da regra de negócio:**
    Caso tenha sido feita alterações na regra de negócio, atualize o PRD associado ao spec