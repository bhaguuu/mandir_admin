import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddLeadModalBody from '../features/leads/components/AddLeadModalBody'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import AddEventModalBody from '../features/transactions/EventAddModal'
import AddNewsModal from '../features/integration/NewsAppModal'
import AddExcelFile from '../features/leads/components/ExcelAddModal'
import EditUserModalBody from '../features/leads/components/EditLead'
import EditEvents from '../features/transactions/EditEvents'
import EditNews from '../features/integration/EditNews'
import AddAdsModalBody from '../features/AdModal'
import EditAdsModalBody from '../features/EditAds'


function ModalLayout(){


    const {isOpen, bodyType, size, extraObject, title} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }



    return(
        <>
        {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                {/* Loading modal body according to different modal type */}
                {
                    {
                             [MODAL_BODY_TYPES.LEAD_ADD_NEW] : <AddLeadModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.EVENT_ADD_NEW] : <AddEventModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.EDIT_LEAD_MODAL] : <EditUserModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.EDIT_EVENT_MODAL] : <EditEvents closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.EDIT_NEWS_MODAL] : <EditNews closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.ADD_ADVERTISMENT] : <AddAdsModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.EDIT_ADS_MODAL] : <EditAdsModalBody closeModal={close} extraObject={extraObject}/>,

                             [MODAL_BODY_TYPES.NEWS_ADD_MODAL] : <AddNewsModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.MODAL_EXCEL_ADD] : <AddExcelFile closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CONFIRMATION] : <ConfirmationModalBody extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
            </div>
            </div>
            </>
    )
}

export default ModalLayout