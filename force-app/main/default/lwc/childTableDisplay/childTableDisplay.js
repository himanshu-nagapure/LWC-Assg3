import { api, LightningElement } from 'lwc';

export default class ChildTableDisplay extends LightningElement {
    @api accIdsFromParent;

    // @api
    // passAccIds(accIds){
    //     console.log("Into passAccId");
    //     this.accIdsFromParent = accIds;
    //     console.log(this.accIdsFromParent);

    // }

    closeModal() {
        this.isModalOpen = false;
        const modalStatusEvent = new CustomEvent("modalstatus",{
            detail: this.isModalOpen,
            accIdfromChild :this.accIdsFromParent
        });
        this.dispatchEvent(modalStatusEvent);
    }

    handleCancel(e){
        console.log("In Handle cancel",e.target.name);
        this.accIdsFromParent.splice(this.accIdsFromParent.indexOf(e.target.name), 1);
        console.log("Handle cancel",this.accIdsFromParent);
    }

    confirmDeleteAccount(event) {
       
        this.isModalOpen = false;
        alert("Following selected accounts will be deleted");
        console.log("In confirmDeleteAccount",this.accIdsFromParent);   
        
        const modalStatusEvent = new CustomEvent("modalstatus",{
            detail: {
                modelOpen :this.isModalOpen,
                accIdfromChild :this.accIdsFromParent
            }
        });
        try {
            
            this.dispatchEvent(modalStatusEvent);
        } catch (error) {
            console.log(error);
        }

        // console.log("Account Ids before delete in child",this.accIdsFromParent);

    }
}