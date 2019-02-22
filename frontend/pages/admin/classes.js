import Classes from "./../../components/AdminComponents/Classes";
import AdminGate from "./../../components/AdminComponents/AdminGate";
import PleaseSignIn from "./../../components/AdminComponents/PleaseSignIn";

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