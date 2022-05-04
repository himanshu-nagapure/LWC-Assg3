import { api, LightningElement } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

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
            detail: this.isModalOpen
        });
        this.dispatchEvent(modalStatusEvent);
        
    }
    deleteAccount(event) {
       
        this.isModalOpen = false;
        const modalStatusEvent = new CustomEvent("modalstatus",{
            detail: this.isModalOpen
        });
        this.dispatchEvent(modalStatusEvent);

        console.log("Account Ids before delete",this.accIdsFromParent);
        this.accIdsFromParent.forEach(acc => {
            
            deleteRecord(acc.Id)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted successfully',
                        variant: 'success'
                    })
                    
                );
                return refreshApex(acc);
                
            })
            .catch(error => {
                console.log(error);
                alert("Cannot delete this account"); 
            });
        });
        console.log("Account Ids after delete",this.accIdsFromParent);

    }
}