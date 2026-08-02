import { institutionalContent } from "@/constants/institutional-content"
import { InstitutionalScreen } from "@/ui/institutional/widgets/institutional-screen"

const ReturnRoute = () => (
  <InstitutionalScreen sections={institutionalContent.return} title="Trocas e devoluções" />
)
export default ReturnRoute
