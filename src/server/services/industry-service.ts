import { getRepository } from "typeorm"
import { IndustrySummary } from "../../types"
import { Industry } from "../model"
import { consolidateNationsInResults } from "./profession-service"

export const getAllIndustrySummaries = async (): Promise<IndustrySummary[]> => {
    const industryRepo = getRepository<Industry>('industry')
    let industrySummaries = null

    const result = await industryRepo
                            .createQueryBuilder("industry")
                            .leftJoinAndSelect("industry.regulatedProfessions", "rp")
                            .leftJoinAndSelect("rp.regulatoryAuthority", "ra")
                            .select(['industry.name', 'rp.nation', 'rp.title', 'ra.name'])
                            .getMany()

    if(result && result.length > 0) {
        industrySummaries = result.map((industry, i) => {
            const regulatedProfessions = consolidateNationsInResults(industry.regulatedProfessions)

            return {
                name: industry.name,
                regulatedProfessions: Object.values(regulatedProfessions),
            }
        })
    }

    return industrySummaries
}