import CategoriesForm from '../../Components/Forms/CategoriesForm/CategoriesForm';
import './AdminPage.css';

const AdminPage = () => {
  return (
    // <div className='container admin-page d-flex flex-column align-items-center'>
    //   <div className='row w-100'>
    //     <div className='col-12 col-md-8 d-flex flex-column align-items-center'>
    //       <h1 className='text-center mb-4'>Categories</h1>
    //     </div>
    //     <div className='col-12 col-md-4 d-flex justify-content-end align-items-end'>
    //       <CategoriesForm />
    //     </div>
    //   </div>
    // </div>
    <div className='row admin-page'>
      <h1 className='text-center mt-3'>Categories</h1>
      <div className='d-flex flex-column align-items-end mt-3'>
        <CategoriesForm className='col-12 col-md-8 d-flex flex-column' />
      </div>
    </div>
  );
};

export default AdminPage;
