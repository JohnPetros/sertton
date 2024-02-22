import { H1, H2, Paragraph, ScrollView, YStack } from 'tamagui'

import { Accordion } from '@/components/shared/Accordion'
import { BackButton } from '@/components/shared/BackButton'
import { List } from '@/components/shared/List'
import { ScreenTitle } from '@/components/shared/ScreenTitle'

import { SCREEN } from '@/utils/constants/screen'

export function TermsAndConditions() {
  return (
    <YStack px={SCREEN.paddingX}>
      <BackButton />
      <ScreenTitle>Termos e condições</ScreenTitle>

      <ScrollView
        contentContainerStyle={{ paddingBottom: SCREEN.paddingBottom }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap={16}>
          <Accordion
            label={
              <H2 color='$gray800' fontSize={16}>
                1. Concordância com os Termos
              </H2>
            }
          >
            <Paragraph color='$gray800'>
              Ao acessar o aplicativo da Sertton Industrial, você concorda em cumprir
              estes termos de serviço, bem como todas as leis e regulamentos aplicáveis.
              Além disso, reconhece a responsabilidade pelo cumprimento das leis locais em
              vigor. Caso não concorde com algum destes termos, fica proibido de usar ou
              acessar este aplicativo. Os materiais disponíveis neste aplicativo estão
              protegidos pelas leis de direitos autorais e marcas comerciais.
            </Paragraph>
          </Accordion>
          <Accordion
            label={
              <H2 color='$gray800' fontSize={16}>
                2. Uso de Licença
              </H2>
            }
          >
            <YStack gap={12}>
              <Paragraph color='$gray800'>
                É concedida permissão para baixar temporariamente uma cópia dos materiais
                (informações ou software) no aplicativo da Sertton Industrial,
                exclusivamente para visualização pessoal e não comercial. Esta concessão
                constitui uma licença e não uma transferência de título. De acordo com
                esta licença, você não está autorizado a:
              </Paragraph>
              <List
                bgColor='$white'
                isNumeric
                items={[
                  'Modificar ou copiar os materiais;',
                  'Utilizar os materiais para fins comerciais ou para exibição pública (seja com fins comerciais ou não);',
                  'Tentar descompilar ou realizar engenharia reversa de qualquer software presente no aplicativo Sertton Industrial;',
                  'Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou',
                  'Transferir os materiais para terceiros ou duplicar os materiais em qualquer outro servidor.',
                ]}
              />
              <Paragraph color='$gray800'>
                Esta licença será automaticamente revogada caso você viole alguma destas
                restrições, podendo também ser revogada pela Sertton Industrial a qualquer
                momento. Ao encerrar a visualização destes materiais ou ao término desta
                licença, você deve excluir todos os materiais baixados, seja em formato
                eletrônico ou impresso.
              </Paragraph>
            </YStack>
          </Accordion>
          <Accordion
            label={
              <H2 color='$gray800' fontSize={16}>
                3. Isenção de Responsabilidade
              </H2>
            }
          >
            <Paragraph color='$gray800'>
              Os materiais disponíveis no aplicativo da Sertton Industrial são fornecidos
              &quot;como estão&quot;. Nossa empresa não oferece garantias, expressas ou
              implícitas, e por meio deste documento, isenta-se e nega todas as outras
              garantias, incluindo, mas não se limitando a, garantias implícitas de
              comercialização, adequação a uma finalidade específica ou não violação de
              propriedade intelectual ou outros direitos. Além disso, a Sertton Industrial
              não garante ou faz representações sobre a precisão, os resultados prováveis
              ou a confiabilidade do uso dos materiais em seu aplicativo, ou de qualquer
              outra forma relacionados a esses materiais ou a aplicativos vinculados a
              este aplicativo.
            </Paragraph>
          </Accordion>
          <Accordion
            label={
              <H2 color='$gray800' fontSize={16}>
                4. Limitações de Responsabilidade
              </H2>
            }
          >
            <Paragraph color='$gray800'>
              Em nenhuma circunstância a Sertton Industrial ou seus fornecedores serão
              responsáveis por quaisquer danos (incluindo, mas não se limitando a, perda
              de dados, lucros ou interrupção de negócios) decorrentes do uso ou da
              incapacidade de uso dos materiais da Sertton Industrial, mesmo que a Sertton
              Industrial ou um representante autorizado de nossa empresa tenha sido
              notificado, verbalmente ou por escrito, da possibilidade de tais danos. Como
              algumas jurisdições não permitem a limitação de garantias implícitas ou a
              limitação de responsabilidade por danos consequentes ou incidentais, essas
              limitações podem não ser aplicáveis a você.
            </Paragraph>
          </Accordion>
          <Accordion
            label={
              <H2 color='$gray800' fontSize={16}>
                5. Precisão dos Materiais
              </H2>
            }
          >
            <Paragraph color='$gray800'>
              Os materiais apresentados no aplicativo da Sertton Industrial podem conter
              erros técnicos, tipográficos ou fotográficos. A Sertton Industrial não
              garante que qualquer material em seu aplicativo seja preciso, completo ou
              atual. Nossa empresa pode realizar alterações nos materiais contidos em seu
              aplicativo a qualquer momento, sem aviso prévio. No entanto, não assumimos o
              compromisso de atualizar os materiais.
            </Paragraph>
          </Accordion>
          <Accordion
            label={
              <H2 color='$gray800' fontSize={16}>
                6. Outros Aplicativos ou Sites
              </H2>
            }
          >
            <Paragraph color='$gray800'>
              A Sertton Industrial não revisou todos os aplicativos ou Sites vinculados ao
              seu aplicativo e não é responsável pelo conteúdo de nenhum aplicativo ou
              site vinculado. A inclusão de qualquer link não implica endosso por parte de
              nosso sistmea. O uso de qualquer site ou aplicativo vinculado é por conta e
              risco do usuário.
            </Paragraph>
          </Accordion>
          <Accordion
            label={
              <H2 color='$gray800' fontSize={16}>
                7. Modificações
              </H2>
            }
          >
            <Paragraph color='$gray800'>
              A Sertton Industrial reserva-se o direito de revisar estes termos de serviço
              a qualquer momento, sem aviso prévio. Ao usar este aplicativo, você concorda
              em estar vinculado à versão atual desses termos de serviço.
            </Paragraph>
          </Accordion>
          <Accordion
            label={
              <H2 color='$gray800' fontSize={16}>
                8. Lei Aplicável
              </H2>
            }
          >
            <Paragraph color='$gray800'>
              Estes termos e condições são regidos e interpretados de acordo com as leis
              brasileiras, e você se submete irrevogavelmente à jurisdição exclusiva dos
              tribunais do seu estado ou localidade.
            </Paragraph>
          </Accordion>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
