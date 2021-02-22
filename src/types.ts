export type ProfessionSearchResult = {
    name: string
    nations: UKNation[]
    regulatoryAuthorityName: string
}

export type ProfessionDetails = {
    name: string
    generalDetails: GeneralDetails
    regulatoryAuthority: RegulatoryAuthorityDetails
    recognitionDecisions: RecognitionDecisionsDetails
}

export type GeneralDetails = {
    title: string
    nation: string
    nationalLegislation: string
    legislationLink: string
    qualificationLevel: string
    reservedActivities: string
    obtainQualificationsMethod: string
    pathObtainQualifications: string
    durationEducation: string
    regulationDescription: string
    mandatoryTraineeship: boolean
    mandatoryRegistrationInProfessionalBodies: boolean
}

export type RegulatoryAuthorityDetails = {
    name: string
    street: string
    city: string
    postCode: string
    phoneNumber: string
    website: string
    emailAddress: string
    regulatedProfessions?: ProfessionSearchResult[]
}

export type RecognitionDecisionsDetails = {

}

export type IndustrySummary = {
    name: string
    regulatedProfessions: ProfessionSearchResult[]
}

export type UKNation = 'all' | 'england' | 'scotland' | 'wales' | 'northern ireland'

export type SearchDataType = 'regulatory-authority' | 'regulated-profession'

export const allUKNations: UKNation[] = [
    'all',
    'england',
    'scotland',
    'wales',
    'northern ireland',
]