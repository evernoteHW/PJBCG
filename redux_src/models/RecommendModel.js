
export default class RecommendModel {
	constructor(props){
		// super(props);
		this.props              = props
		this.canInvestAmount    = props.canInvestAmount;
		this.countdownEnabled   = props.countdownEnabled;
		this.fundStatusDescribe = props.fundStatusDescribe;
		this.openSaleTime       = props.openSaleTime;
		this.productAnnualRate  = props.productAnnualRate;
		this.productName        = props.productName ? props.productName: '';
		this.productTypeId      = props.productTypeId;
		this.productTypeName    = props.productTypeName;
		this.saleCountdownTime  = props.saleCountdownTime;
		this.ttbStatus          = props.ttbStatus;
		this.tag1               = props.tag1;
		this.tag2               = props.tag2;
		this.deadlineMin        = props.deadlineMin;
		this.deadlineMax        = props.deadlineMax;
		this.activityTime       = props.activityTime;
		this.lockUpPeriodDesc   = props.lockUpPeriodDesc;
		this.productItem        = props.productItem;
		this.minAnnualRate      = props.minAnnualRate;
		this.maxAnnualRate      = props.maxAnnualRate;
	}
}

// export default function RecommendModel(argument) {
// 	this.canInvestAmount    = argument.canInvestAmount;
// 	this.countdownEnabled   = argument.countdownEnabled;
// 	this.fundStatusDescribe = argument.fundStatusDescribe;
// 	this.openSaleTime       = argument.openSaleTime;
// 	this.productAnnualRate  = argument.productAnnualRate;
// 	this.productName        = argument.productName;
// 	this.productTypeId      = argument.productTypeId;
// 	this.productTypeName    = argument.productTypeName;
// 	this.saleCountdownTime  = argument.saleCountdownTime;
// 	this.ttbStatus          = argument.ttbStatus;
// }