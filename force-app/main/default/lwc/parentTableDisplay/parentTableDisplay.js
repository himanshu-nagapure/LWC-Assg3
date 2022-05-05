import { LightningElement, wire, api } from 'lwc';
import getAccounts from '@salesforce/apex/accountClass.getAccounts';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class ParentTableDisplay extends LightningElement {
    @wire(getAccounts)
    accounts;

    @api isModalOpen = false;
    @api accIds = [];
    @api accIdsFromChild = [];

    // btnVisible = false;
    getAccIds(e) {
        console.log("Watch Target ",e);
        if (e.target.checked) {
            this.accIds.push(e.target.name);
            // btnVisible = true;
            // const boxes = this.template.querySelectorAll('lightning-input');
            // boxes.forEach(box =>
            //     box.checked = e.target.name === box.name
            // );
            // this.dupaccid = this.accdata[e.target.value].Id
        }
        else{
            this.accIds.splice(this.accIds.indexOf(e.target.name), 1);
            // btnVisible = false;
        }
        console.log("Account Ids in making",this.accIds);
    }
    
    handleModal() {
        console.log("Delete Button CLicked");
        this.isModalOpen = true;
        // try {
            
        //     this.template.querySelector('c-child-table-display').passAccIds(this.accIds);
        //     console.log("Data successfully passed to child");
        // } catch (error) {
        //     console.log(error);

        // }
    }

    handleModalStatus(event){
        this.isModalOpen = event.detail.modelOpen;
        this.accIdsFromChild = event.detail.accIdfromChild;

        console.log("Account Ids before delete from parent",this.accIdsFromChild);
        // this.accIdsFromChild.then(response => response.json())
        // .then()
        this.accIdsFromChild.forEach(acc => console.log("account:",acc.Name));
        
        try {
            this.accIdsFromChild.forEach(acc => {
            
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
        } catch (error) {
            console.log(error);
        }
        // console.log("Account Ids after delete from parent",this.accIdsFromChilds);

    }
        
}