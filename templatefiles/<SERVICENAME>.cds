@(requires: [
    '<SERVICENAME>_READ',
])

service <SERVICENAME> {
    @cds.persistence.exists
    @(restrict : [ { grant : ['READ'], to : ['<SERVICENAME>_READ'] } ])
    entity Materials {
        key MaterialNumber : String(18);
        MaterialDescription : String(40);
    };


    @(restrict : [ { grant : ['WRITE'], to : ['<SERVICENAME>_WRITE'] }])
    action sampleCreate( 
        IP_SAMPLE: String(1)
    ) returns array of {
        SAMPLE: String
    };

}