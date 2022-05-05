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
        console.log(e.target.name);
        this.accIdsFromParent.splice(this.accIdsFromParent.indexOf(e.target.name), 1);
        console.log("Handle cancel",this.accIdsFromParent);
    }

    confirmDeleteAccount(event) {
       
        alert("Following selected accounts will be deleted");
        this.isModalOpen = false;
        const modalStatusEvent = new CustomEvent("modalstatus",{
            detail: {
                modelOpen :this.isModalOpen,
                accIdfromChild :this.accIdsFromParent
            }
        });
        this.dispatchEvent(modalStatusEvent);
        console.log(this.accIdsFromParent);   

        console.log("Account Ids before delete in child",this.accIdsFromParent);

    }
}