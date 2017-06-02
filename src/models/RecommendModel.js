
export default class RecommondModel {
	constructor(props){
		// super(props);
		this.canInvestAmount    = props.canInvestAmount;
		this.countdownEnabled   = props.countdownEnabled;
		this.fundStatusDescribe = props.fundStatusDescribe;
		this.openSaleTime       = props.openSaleTime;
		this.productAnnualRate  = props.productAnnualRate;
		this.productName        = props.productName;
		this.productTypeId      = props.productTypeId;
		this.productTypeName    = props.productTypeName;
		this.saleCountdownTime  = props.saleCountdownTime;
		this.ttbStatus          = props.ttbStatus;
	}
}