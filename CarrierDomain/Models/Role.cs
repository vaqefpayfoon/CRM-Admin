namespace CarrierDomain.Models
{
    public enum Role
    {
        Sales, Service, SalesAdmin, ServiceAdmin, FullAccess
    }
    public enum ProjectState
    {
        Invoices, Factors
    }
    public enum ChargeType
    {
        Ticket, Hotel, Taxi, Food, Other
    }
    public enum SaleState
    {
        Follow, Clue, Opportunity
    }
}