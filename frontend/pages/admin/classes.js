import Classes from "./../../components/Classes";
import AdminGate from "./../../components/AdminGate";
import PleaseSignIn from "./../../components/PleaseSignIn";

const ClassesPage = props => (
  <div>
    <PleaseSignIn>
      <AdminGate>
        <Classes />
      </AdminGate>
    </PleaseSignIn>
  </div>
);

export default ClassesPage;