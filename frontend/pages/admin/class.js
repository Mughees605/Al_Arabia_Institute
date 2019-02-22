import Class from "./../../components/AdminComponents/Class";
import AdminGate from "./../../components/AdminComponents/AdminGate";
import PleaseSignIn from "./../../components/AdminComponents/PleaseSignIn";

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