import { GeneralDetails, ProfessionDetails, ProfessionSearchResult, RecognitionDecisionsDetails, RegulatoryAuthorityDetails, UKNation } from "../../types"
import { getRepository } from 'typeorm'
import { RegulatedProfession } from '../model'

const mapToGeneralDetails = (profession: RegulatedProfession) => {
    return {
        title: profession.title,
        nation: profession.nation,
        nationalLegislation: profession.nationalLegislation,
        legislationLink: profession.legislationLink,
        qualificationLevel: profession.qualificationLevel,
        reservedActivities: profession.reservedActivities,
        obtainQualificationsMethod: profession.obtainQualificationsMethod,
        pathObtainQualifications: profession.pathObtainQualifications,
        durationEducation: profession.durationEducation,
        regulationDescription: profession.regulationDescription,
        mandatoryTraineeship: profession.mandatoryTraineeship,
        mandatoryRegistrationInProfessionalBodies: profession.mandatoryRegistrationInProfessionalBodies,
    } as GeneralDetails
}

const mapToRegulatoryAuthority = (profession: RegulatedProfession) => {
    const { regulatoryAuthority } = profession
    
    return {
        name: regulatoryAuthority.name,
        street: regulatoryAuthority.street,
        city: regulatoryAuthority.city,
        postCode: regulatoryAuthority.postCode,
        phoneNumber: regulatoryAuthority.phoneNumber,
        website: regulatoryAuthority.website,
        emailAddress: regulatoryAuthority.emailAddress,
    } as RegulatoryAuthorityDetails
}

const mapToRecognitionDecisions = (profession: RegulatedProfession) => {
    return {} as RecognitionDecisionsDetails
}

const extractNations = (nations: string): UKNation[] => {
    const ukNations = []
    nations = nations.toLowerCase()

    if(nations.includes('all')) ukNations.push('all')
    if(nations.includes('england')) ukNations.push('England')
    if(nations.includes('scotland')) ukNations.push('Scotland')
    if(nations.includes('wales')) ukNations.push('Wales')
    if(nations.includes('northern ireland')) ukNations.push('Northern Ireland')

    return ukNations
}

export const consolidateNationsInResults = (results: RegulatedProfession[]): { [title: string]: ProfessionSearchResult } => results.reduce((prev: { [title: string]: ProfessionSearchResult }, current: RegulatedProfession) => {
    const { title } = current
    const regulatoryAuthorityName = current.regulatoryAuthority?.name || ''

    let consolidatedResult = prev[title]
    const nations = extractNations(current.nation)

    if (!consolidatedResult) {
        consolidatedResult = {
            name: title,
            nations: nations,
            regulatoryAuthorityName,
        }

        prev[title] = consolidatedResult
    } else {
        consolidatedResult.nations.push(...nations)
    }

    return prev
}, {})

export const findProfessionName = async (professionName: string): Promise<ProfessionSearchResult | null> =>  {
    const professsionRepo = getRepository<RegulatedProfession>('regulated_profession')
    let profession = null

    const results = await professsionRepo
                            .createQueryBuilder("regulated_profession")
                            .where("LOWER(regulated_profession.title) = LOWER(:professionName)", { professionName })
                            .getMany()

    if(results && results.length > 0) {
        const consolidatedResults = consolidateNationsInResults(results)
        profession = Object.values(consolidatedResults)[0]
    }

    return profession
}

export const searchForProfession = async (professionName: string, nation: UKNation): Promise<ProfessionSearchResult[]> => {
    const professsionRepo = getRepository<RegulatedProfession>('regulated_profession')

    let query = '(LOWER(regulated_profession.title) like LOWER(:professionName) or LOWER(regulated_profession.genericNames) like LOWER(:professionName))'
    const params = {
        professionName:`%${professionName.trim()}%`,
        nation: null,
        all: null
    }

    if(nation !== 'all') {
        query += ' and ((LOWER(regulated_profession.nation) like LOWER(:nation)) or (LOWER(regulated_profession.nation) = :all))'
        params.nation = `%${nation}%`
        params.all = 'all'
    }

    const results = await professsionRepo
                             .createQueryBuilder("regulated_profession")
                             .leftJoinAndSelect("regulated_profession.regulatoryAuthority", "ra")
                             .select(['regulated_profession.title', 'regulated_profession.nation', 'ra.name'])
                             .where(query, params)
                             .getMany()

    const consolidatedResults = consolidateNationsInResults(results)

    return Object.values(consolidatedResults)
}

export const findProfessionDetails = async (professionName: string, nation: string): Promise<ProfessionDetails | null> => {
    const professsionRepo = getRepository<RegulatedProfession>('regulated_profession')
    let professionDetails = null

    const result = await professsionRepo
                            .createQueryBuilder("regulated_profession")
                            .leftJoinAndSelect("regulated_profession.regulatoryAuthority", "regulatoryAuthority")
                            .where("LOWER(regulated_profession.title) = LOWER(:professionName) and LOWER(regulated_profession.nation) like LOWER(:nation)", { professionName, nation: `%${nation}%` })
                            .getOne()

    if(result) {
        professionDetails = {
            name: result.title,
            generalDetails: mapToGeneralDetails(result),
            regulatoryAuthority: mapToRegulatoryAuthority(result),
            recognitionDecisions: mapToRecognitionDecisions(result),
        } as ProfessionDetails
    }

    return professionDetails
}