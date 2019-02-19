import Class from "./../../components/Class";
import AdminGate from "./../../components/AdminGate";
import PleaseSignIn from "./../../components/PleaseSignIn";

const ClassPage = props => (
  <div>
    <PleaseSignIn>
      <AdminGate>
        <Class id={props.query.id || ''}/>
      </AdminGate>
    </PleaseSignIn>
  </div>
);

export default ClassPage;