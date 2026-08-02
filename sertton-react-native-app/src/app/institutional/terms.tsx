import { institutionalContent } from "@/constants/institutional-content"
import { InstitutionalScreen } from "@/ui/institutional/widgets/institutional-screen"

const TermsRoute = () => (
  <InstitutionalScreen sections={institutionalContent.terms} title="Termos e condições" />
)
export default TermsRoute
