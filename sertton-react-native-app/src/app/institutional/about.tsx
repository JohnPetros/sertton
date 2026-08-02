import { institutionalContent } from "@/constants/institutional-content"
import { InstitutionalScreen } from "@/ui/institutional/widgets/institutional-screen"

const AboutRoute = () => (
  <InstitutionalScreen sections={institutionalContent.about} title="Sobre a empresa" />
)
export default AboutRoute
