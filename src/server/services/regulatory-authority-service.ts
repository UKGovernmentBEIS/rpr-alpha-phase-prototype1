import { getRepository } from "typeorm"
import { RegulatoryAuthorityDetails } from "../../types"
import { RegulatoryAuthority } from "../model"
import { consolidateNationsInResults } from "./profession-service"

const mapToRegulatoryAuthorityDetails = (regulatoryAuthority: RegulatoryAuthority) => {
    const consolidatedProfessions = consolidateNationsInResults(regulatoryAuthority.regulatedProfessions)

    return {
        name: regulatoryAuthority.name,
        street: regulatoryAuthority.street,
        city: regulatoryAuthority.city,
        postCode: regulatoryAuthority.postCode,
        phoneNumber: regulatoryAuthority.phoneNumber,
        website: regulatoryAuthority.website,
        emailAddress: regulatoryAuthority.emailAddress,
        regulatedProfessions: Object.values(consolidatedProfessions),
    } as RegulatoryAuthorityDetails
}

export const findRegulatoryAuthorityDetails = async (regulatoryAuthorityName: string): Promise<RegulatoryAuthorityDetails | null> => {
    const regulatoryAuthoritiesRepo = getRepository<RegulatoryAuthority>('regulatory_authority')
    let regulatoryAuthorityDetails = null

    const result = await regulatoryAuthoritiesRepo
                            .createQueryBuilder("regulatory_authority")
                            .leftJoinAndSelect("regulatory_authority.regulatedProfessions", "regulatedProfession")
                            .where("LOWER(regulatory_authority.name) = LOWER(:regulatoryAuthorityName)", { regulatoryAuthorityName })
                            .select(['regulatory_authority', 'regulatedProfession.title', 'regulatedProfession.nation'])
                            .getOne()

    if(result) {
        regulatoryAuthorityDetails = mapToRegulatoryAuthorityDetails(result)
    }

    return regulatoryAuthorityDetails
}

export const searchForRegulatoryAuthority = async (regulatoryAuthorityName: string, nation: string): Promise<string[]> => {
    const regulatoryAuthoritiesRepo = getRepository<RegulatoryAuthority>('regulatory_authority')

    let query = '(LOWER(regulatory_authority.name) like LOWER(:regulatoryAuthorityName))'
    const params = {
        regulatoryAuthorityName:`%${regulatoryAuthorityName.trim()}%`,
        nation: null,
        all: null,
    }

    if(nation !== 'all') {
        query += ' and (LOWER(regulatory_authority.nation) like LOWER(:nation) or LOWER(regulatory_authority.nation) = :all)'
        params.nation = `%${nation}%`
        params.all = 'all'
    }

    const results = await regulatoryAuthoritiesRepo
                             .createQueryBuilder("regulatory_authority")
                             .select('regulatory_authority.name')
                             .where(query, params)
                             .getMany()

    return results.map(result => result.name)
}