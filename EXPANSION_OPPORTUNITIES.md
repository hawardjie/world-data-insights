# Data Expansion Opportunities Analysis

**Goal:** Identify high-value, non-redundant data visualizations using available data sources

---

## Current Coverage Audit

### What's Already Covered ✅

| Category | Current Panels | Data Sources | Key Metrics |
|----------|---------------|--------------|-------------|
| Monetary Policy | Money & Finance | FRED | Interest rates, money supply, Fed funds rate |
| Economic Output | GDP & National Accounts | FRED | US GDP (nominal/real), inflation |
| Employment | Labor Markets | FRED | Unemployment, payrolls, participation rate |
| Price Levels | Prices & Inflation | FRED | CPI, PPI, core inflation |
| Currency | Exchange Rates | FRED | USD exchange rates vs major currencies |
| Trade | International Trade | FRED | Trade balances |
| Global Development | World Development | World Bank + Data Commons | World GDP, population, life expectancy, urbanization, unemployment comparison |
| Population | Demographics | World Bank + Census + UN | Fertility, mortality, birth/death rates, US & world population |
| Climate | Environment | World Bank | CO2 emissions |

### Coverage Gaps 🔍

**Major Economic Areas NOT Covered:**
1. Housing markets (prices, sales, construction)
2. Consumer confidence & sentiment
3. Government debt & fiscal policy
4. Income inequality & poverty
5. Education & human capital
6. Retail sales & consumer spending
7. Manufacturing & industrial production
8. Digital economy & connectivity
9. Energy production & consumption
10. Healthcare metrics
11. Agricultural production
12. Infrastructure development
13. Innovation & R&D
14. Social welfare programs
15. Regional/state-level economics

---

## High-Priority Additions (Immediate Value, Easy Implementation)

### 1. 🏠 U.S. HOUSING MARKET PANEL
**Why Add This:** Housing is 15-20% of GDP, major economic indicator, not currently covered at all

**Data Sources:** FRED + U.S. Census
**Difficulty:** Easy (uses existing chart types)
**Uniqueness:** Completely new category

**Proposed Charts:**

#### Chart 1: Housing Starts & Building Permits (FRED)
- `HOUST` - Housing Starts (thousands of units)
- `PERMIT` - Building Permits
- **Insight:** Leading indicator of economic activity

#### Chart 2: Median Home Price Trends (FRED)
- `MSPUS` - Median Sales Price of Houses Sold
- `CSUSHPISA` - S&P/Case-Shiller Home Price Index
- **Insight:** Housing affordability, wealth effects

#### Chart 3: Mortgage Rates (FRED)
- `MORTGAGE30US` - 30-Year Fixed Rate Mortgage Average
- `MORTGAGE15US` - 15-Year Fixed Rate Mortgage Average
- **Insight:** Cost of homeownership, monetary policy transmission

#### Chart 4: Housing Market Health (FRED + Census)
- `RSXFS` - Retail Sales: Building Materials
- Census: Home ownership rate by year
- Census: Median rent trends
- **Insight:** Market dynamics, affordability

**Non-redundant because:** No housing data currently shown anywhere

---

### 2. 📊 CONSUMER & BUSINESS CONFIDENCE PANEL
**Why Add This:** Leading economic indicators, predict consumer spending and business investment

**Data Sources:** FRED
**Difficulty:** Easy
**Uniqueness:** New category, predictive value

**Proposed Charts:**

#### Chart 1: Consumer Sentiment (FRED)
- `UMCSENT` - University of Michigan Consumer Sentiment
- `CSCICP03USM665S` - Consumer Confidence Index
- **Insight:** Consumer spending intentions

#### Chart 2: Consumer Expectations (FRED)
- `UMCSENT1` - Consumer Expectations Index
- `STLFSI4` - Financial Stress Index (inverted)
- **Insight:** Future economic outlook from consumers

#### Chart 3: Business Confidence (FRED)
- `BSCICP03USM665S` - Business Confidence Index
- `DRCCLACBS` - Commercial Bank Lending Standards
- **Insight:** Investment and hiring intentions

#### Chart 4: Economic Policy Uncertainty (FRED)
- `USEPUINDXD` - Economic Policy Uncertainty Index
- **Insight:** Policy stability, investment climate

**Non-redundant because:** Sentiment/confidence not covered; these are forward-looking indicators

---

### 3. 🏛️ GOVERNMENT FINANCE & FISCAL POLICY PANEL
**Why Add This:** Government debt and deficits are major economic concerns, affect interest rates

**Data Sources:** FRED
**Difficulty:** Easy
**Uniqueness:** Fiscal policy not currently covered

**Proposed Charts:**

#### Chart 1: Federal Debt (FRED)
- `GFDEBTN` - Federal Debt Total (trillions)
- `GFDEGDQ188S` - Federal Debt as % of GDP
- **Insight:** Debt sustainability, fiscal health

#### Chart 2: Budget Deficit/Surplus (FRED)
- `FYFSD` - Federal Surplus or Deficit
- `FYFSGDA188S` - Deficit as % of GDP
- **Insight:** Fiscal balance, government borrowing needs

#### Chart 3: Government Spending & Revenue (FRED)
- `W006RC1Q027SBEA` - Government Total Expenditures
- `W007RC1Q027SBEA` - Government Total Receipts
- **Insight:** Fiscal policy stance

#### Chart 4: Interest on Debt (FRED)
- `A091RC1Q027SBEA` - Federal Government Interest Payments
- **Insight:** Debt servicing costs, budget pressure

**Non-redundant because:** Fiscal policy and government finance completely missing

---

### 4. 💰 INCOME, POVERTY & INEQUALITY PANEL
**Why Add This:** Social indicators, inequality rising concern, combines US and global data

**Data Sources:** U.S. Census + World Bank + Data Commons
**Difficulty:** Medium (multiple data sources)
**Uniqueness:** Social/distributional aspects not covered

**Proposed Charts:**

#### Chart 1: U.S. Median Household Income (Census ACS)
- Variable: `B19013_001E` - Median Household Income
- Time series across multiple ACS years
- **Insight:** Income growth for typical American household

#### Chart 2: U.S. Poverty Rate (Census)
- Census poverty estimates over time
- **Insight:** Economic hardship trends

#### Chart 3: Global Income Inequality (World Bank)
- `SI.POV.GINI` - Gini Index for multiple countries
- Comparison: USA, China, Germany, Brazil, South Africa
- **Insight:** Income distribution, inequality trends

#### Chart 4: Global Extreme Poverty (World Bank)
- `SI.POV.DDAY` - Poverty headcount ratio at $2.15/day
- **Insight:** UN SDG progress, global development

**Non-redundant because:** Income distribution and poverty not shown; combines micro (Census) and macro (World Bank)

---

### 5. 📚 EDUCATION & HUMAN CAPITAL PANEL
**Why Add This:** Human capital drives long-term growth, correlates with development

**Data Sources:** World Bank + Google Data Commons
**Difficulty:** Easy
**Uniqueness:** Education not covered at all

**Proposed Charts:**

#### Chart 1: Global School Enrollment (World Bank)
- `SE.PRM.NENR` - Primary school enrollment rate
- `SE.SEC.NENR` - Secondary school enrollment rate
- `SE.TER.ENRR` - Tertiary enrollment rate
- **Insight:** Educational access globally

#### Chart 2: Adult Literacy Rates (World Bank)
- `SE.ADT.LITR.ZS` - Adult literacy rate by country/region
- **Insight:** Basic education attainment

#### Chart 3: Educational Attainment Comparison (Data Commons)
- `Count_Person_BachelorsDegreeOrHigher` for major countries
- **Insight:** Higher education across economies

#### Chart 4: Education Expenditure (World Bank)
- `SE.XPD.TOTL.GD.ZS` - Government expenditure on education (% of GDP)
- **Insight:** Investment in human capital

**Non-redundant because:** Education completely missing; predicts future economic potential

---

### 6. 🛒 RETAIL SALES & CONSUMER SPENDING PANEL
**Why Add This:** Consumer spending is 70% of US GDP

**Data Sources:** FRED
**Difficulty:** Easy
**Uniqueness:** Consumer behavior beyond sentiment

**Proposed Charts:**

#### Chart 1: Retail Sales (FRED)
- `RSXFS` - Advance Retail Sales
- `RSCCAS` - Retail Sales: Clothing
- `RSGASS` - Retail Sales: Gas Stations
- **Insight:** Consumer spending by category

#### Chart 2: E-commerce Growth (FRED)
- `ECOMSA` - E-commerce Retail Sales
- As % of total retail sales
- **Insight:** Digital transformation of retail

#### Chart 3: Personal Consumption Expenditures (FRED)
- `PCE` - Personal Consumption Expenditures
- `PCEDG` - PCE: Durable Goods
- `PCEND` - PCE: Nondurable Goods
- `PCESV` - PCE: Services
- **Insight:** Consumer spending composition

#### Chart 4: Personal Savings Rate (FRED)
- `PSAVERT` - Personal Saving Rate
- **Insight:** Consumer financial health, spending capacity

**Non-redundant because:** Actual consumer spending not shown (only sentiment in #2)

---

## Medium-Priority Additions (High Value, Moderate Complexity)

### 7. 🏭 MANUFACTURING & INDUSTRIAL PRODUCTION PANEL
**Data Source:** FRED
**Why:** Manufacturing is key economic sector, supply chain insights

**Key Charts:**
- Industrial Production Index (`INDPRO`)
- Capacity Utilization (`TCU`)
- Manufacturing PMI (`MANEMP`)
- Durable Goods Orders (`DGORDER`)

**Non-redundant because:** Production-side economics not covered

---

### 8. 🌐 DIGITAL ECONOMY & CONNECTIVITY PANEL
**Data Sources:** World Bank + Data Commons
**Why:** Modern economic infrastructure, digital divide

**Key Charts:**
- Internet penetration by country (World Bank: `IT.NET.USER.ZS`)
- Mobile subscriptions (World Bank: `IT.CEL.SETS.P2`)
- Broadband subscriptions (World Bank: `IT.NET.BBND.P2`)
- Digital services trade

**Non-redundant because:** Digital infrastructure not covered; increasingly important

---

### 9. ⚡ ENERGY & SUSTAINABILITY PANEL
**Data Source:** World Bank
**Why:** Energy transition, climate policy, economic costs

**Key Charts:**
- Renewable energy % (World Bank: `EG.FEC.RNEW.ZS`)
- Energy consumption per capita (World Bank: `EG.USE.PCAP.KG.OE`)
- Access to electricity (World Bank: `EG.ELC.ACCS.ZS`)
- Energy efficiency trends

**Non-redundant because:** Environment panel only shows CO2; energy economics broader

---

### 10. 🎯 UN SUSTAINABLE DEVELOPMENT GOALS DASHBOARD
**Data Source:** UN Data
**Why:** Comprehensive development framework, global priorities

**Key Charts:**
- SDG 1: No Poverty - poverty rates
- SDG 2: Zero Hunger - undernourishment
- SDG 3: Good Health - life expectancy, vaccination
- SDG 4: Quality Education - school enrollment
- SDG 5: Gender Equality - gender wage gap
- SDG 13: Climate Action - emissions reduction

**Non-redundant because:** Unique UN framework; combines social, economic, environmental

---

### 11. 🏥 GLOBAL HEALTH INDICATORS PANEL
**Data Sources:** World Bank + Data Commons
**Why:** COVID showed importance; healthcare spending indicator

**Key Charts:**
- Healthcare spending % GDP (World Bank: `SH.XPD.CHEX.GD.ZS`)
- Physicians per 1000 (World Bank: `SH.MED.PHYS.ZS`)
- Hospital beds per 1000 (World Bank: `SH.MED.BEDS.ZS`)
- Vaccination rates

**Non-redundant because:** Healthcare access/quality not shown; economic implications

---

### 12. 👶 POPULATION PROJECTIONS PANEL
**Data Source:** UN Data
**Why:** Long-term planning, pension/healthcare costs

**Key Charts:**
- World population to 2050/2100
- Regional population projections
- Aging population trends (65+ share)
- Working-age population trends

**Non-redundant because:** Current data shows historical; this shows future

---

## Lower Priority (More Complex Implementation)

### 13. 🗺️ U.S. STATE-LEVEL ECONOMIC DASHBOARD
**Data Sources:** Census + FRED Regional Data
**Why:** Regional disparities, state comparisons

**Would require:** Map visualization OR multi-select dropdown for states

**Key Metrics:**
- Population by state
- Median income by state
- Unemployment by state
- GDP by state

---

### 14. 🌍 GLOBAL TRADE MATRIX
**Data Source:** UN Comtrade
**Why:** Trade relationships, supply chains

**Would require:** Sankey diagram or network graph

**Key Insights:**
- Top trading partners
- Trade flows by country
- Export/import composition

---

### 15. 🗺️ POPULATION DENSITY MAPS
**Data Source:** WorldPop
**Why:** Geographic distribution, urbanization patterns

**Would require:** Leaflet or Mapbox integration

**Key Visualizations:**
- Interactive choropleth maps
- Population density heatmaps
- Urban growth visualization

---

## Recommended Implementation Priority

### Phase 1 (Immediate - Same Tech Stack)
1. ✅ **U.S. Housing Market** - Completely new, high interest, FRED + Census
2. ✅ **Consumer Confidence** - Leading indicators, FRED only
3. ✅ **Government Finance** - Major gap, FRED only
4. ✅ **Income & Poverty** - Social dimension, Census + World Bank

### Phase 2 (Near-term - Easy Extensions)
5. **Education** - Human capital, World Bank + Data Commons
6. **Retail & Consumer Spending** - Consumer economy, FRED
7. **Manufacturing & Production** - Supply-side, FRED
8. **Digital Economy** - Modern infrastructure, World Bank

### Phase 3 (Medium-term - More Data Integration)
9. **Energy & Sustainability** - World Bank extension
10. **UN SDG Dashboard** - UN Data showcase
11. **Global Health** - World Bank + Data Commons
12. **Population Projections** - UN Data future view

### Phase 4 (Future - New Visualization Types)
13. **State-level Dashboard** - Requires maps or complex filters
14. **Global Trade Matrix** - Requires network/flow charts
15. **Population Density** - Requires map library

---

## Impact Analysis

### Top 4 Additions Would Give You:

| Addition | Uniqueness Score | User Interest | Implementation Ease | Combined Score |
|----------|-----------------|---------------|---------------------|----------------|
| Housing Market | 10/10 | 10/10 | 9/10 | **29/30** |
| Consumer Confidence | 9/10 | 9/10 | 10/10 | **28/30** |
| Government Finance | 9/10 | 8/10 | 10/10 | **27/30** |
| Income & Poverty | 9/10 | 9/10 | 7/10 | **25/30** |

### Coverage Improvement:
- **Current:** 9 economic dimensions covered
- **After Phase 1:** 13 dimensions covered (+44%)
- **After Phase 2:** 17 dimensions covered (+89%)
- **After Phase 3:** 21 dimensions covered (+133%)

---

## Next Steps

Would you like me to implement any of these? I recommend starting with **Phase 1** additions:

1. **Housing Market Panel** - Most requested data, completely new
2. **Consumer Confidence Panel** - Simple but powerful leading indicators
3. **Government Finance Panel** - Important macro context
4. **Income & Poverty Panel** - Social/distributional dimension

Each would take 10-15 minutes to implement using your existing chart components.
