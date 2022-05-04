import { LightningElement, wire, api } from 'lwc';
import getAccounts from '@salesforce/apex/accountClass.getAccounts';

export default class ParentTableDisplay extends LightningElement {
    @wire(getAccounts)
    accounts;

    @api isModalOpen = false;

    @api accIds = [];
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
    
    handleModal(event) {
        console.log("Delete Button CLicked");
        this.isModalOpen = true;
        try {
            
            this.template.querySelector('c-child-table-display').passAccIds(this.accIds);
        } catch (error) {
            console.log(error);

        }
        console.log("Delete Button CLicked 2");

        // this.accName = event.currentTarget.dataset.name;
        // this.accId = event.currentTarget.dataset.id;
    }
    handleModalStatus(event){
        this.isModalOpen = event.detail;

    }
}