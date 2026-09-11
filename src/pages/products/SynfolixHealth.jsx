import ProductHero from '../../components/Product/ProductHero'
import ProductProblem from '../../components/Product/ProductProblem'
import ProductSolution from '../../components/Product/ProductSolution'
import ProductFeatures from '../../components/Product/ProductFeatures'
import ProductScreenshots from '../../components/Product/ProductScreenshots'
import ProductBenefits from '../../components/Product/ProductBenefits'
import ProductAudience from '../../components/Product/ProductAudience'
import ProductIntegrations from '../../components/Product/ProductIntegrations'
import ProductSecurity from '../../components/Product/ProductSecurity'
import ProductCTA from '../../components/Product/ProductCTA'
import { synfolixHealth } from '../../data/products/synfolixHealth'

function SynfolixHealth() {
  const product = synfolixHealth

  return (
    <>
      <ProductHero
        name={product.name}
        industry={product.industry}
        tagline={product.tagline}
        description={product.description}
      />
      <ProductProblem {...product.problem} />
      <ProductSolution {...product.solution} />
      <ProductFeatures features={product.features} />
      <ProductScreenshots screenshots={product.screenshots} />
      <ProductBenefits benefits={product.benefits} />
      <ProductAudience audience={product.audience} note={product.audienceNote} />
      <ProductIntegrations integrations={product.integrations} />
      <ProductSecurity security={product.security} />
      <ProductCTA name={product.name} heading={product.cta.heading} text={product.cta.text} />
    </>
  )
}

export default SynfolixHealth
