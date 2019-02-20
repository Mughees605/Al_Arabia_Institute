import Class from "./../../components/Class";
import AdminGate from "./../../components/AdminGate";
import PleaseSignIn from "./../../components/PleaseSignIn";

const ClassPage = props => (
  <div>
    <PleaseSignIn>
      <AdminGate>
        <Class class_id={props.query.class_id || ''}/>
      </AdminGate>
    </PleaseSignIn>
  </div>
);

export default ClassPage;