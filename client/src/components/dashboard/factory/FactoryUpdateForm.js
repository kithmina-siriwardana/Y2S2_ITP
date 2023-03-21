// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const FactoryUpdateForm = ({ setError, id }) => {
//     const navigate = useNavigate()

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault()
 
//     const response = await fetch('http://localhost:5000/api/factory/' + id, {
//       method: 'PATCH',
//       body: JSON.stringify({
//         fId: fId,
//         fName: fName,
//         fLocation: fLocation,
//         numOfMachines: numOfMachines,
//         numOfVehicles: numOfVehicles,
//         numOfEmployees: numOfEmployees,
//         createdDate: createdDate
//       }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setError(json.error)
//       console.log(json.error)
//     }

//     if (response.ok) {
//       console.log('Factory updated successfully.', json)
//       window.location.reload();
//     }
//   }

//     return <>
//         <div className="row mb-3">
//             <div className="col-md-8 col-lg-9">
//                 <button data-bs-toggle="modal" data-bs-target="#verticalycentered" className="btn btn-danger">Update details</button>
//                 <div className="modal fade" id="verticalycentered" tabIndex={'-1'}  aria-modal="true" role="dialog">
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Update</h5>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//                             </div>
//                             <div className="modal-body">
//                                 Are you sure you want to update this factory?
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//                                 <button onClick={handleUpdateSubmit} type="button" className="btn btn-primary">Confirm</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
// }

// export default FactoryUpdateForm