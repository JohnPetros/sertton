import { institutionalContent } from "@/constants/institutional-content"
import { InstitutionalScreen } from "@/ui/institutional/widgets/institutional-screen"

const PrivacyRoute = () => (
  <InstitutionalScreen sections={institutionalContent.privacy} title="Privacidade" />
)
export default PrivacyRoute
