import React, { useMemo, useState } from 'react'

// Simple, approximate pricing assumptions (for demonstration only).
// These are not real AWS prices — they are sample hourly rates to produce estimates.
const INSTANCE_TYPES = {
  't3.micro': { vcpu: 2, ram: 1, hourly: 0.0104 },
  't3.small': { vcpu: 2, ram: 2, hourly: 0.0208 },
  't3.medium': { vcpu: 2, ram: 4, hourly: 0.0416 },
  't3.large': { vcpu: 2, ram: 8, hourly: 0.0832 },
  'm5.large': { vcpu: 2, ram: 8, hourly: 0.096 },
  'c5.large': { vcpu: 2, ram: 4, hourly: 0.085 },
  'm5.xlarge': { vcpu: 4, ram: 16, hourly: 0.192 },
}

const STORAGE_PRICING = {
  gp2: 0.10, // $/GB-month (approx)
  gp3: 0.08,
  standard: 0.023,
}

export default function AwsPricePredictor() {
  const [instanceType, setInstanceType] = useState('t3.medium')
  const [hoursPerMonth, setHoursPerMonth] = useState(730)
  const [storageGb, setStorageGb] = useState(50)
  const [storageType, setStorageType] = useState('gp3')
  const [dataOutGb, setDataOutGb] = useState(50)
  const [customHourly, setCustomHourly] = useState('')

  const hourlyRate = useMemo(() => {
    if (customHourly && !isNaN(Number(customHourly))) return Number(customHourly)
    const inst = INSTANCE_TYPES[instanceType]
    return inst ? inst.hourly : 0
  }, [instanceType, customHourly])

  const storageMonthly = useMemo(() => {
    const price = STORAGE_PRICING[storageType] ?? 0.08
    return storageGb * price
  }, [storageGb, storageType])

  const dataOutMonthly = useMemo(() => {
    // simple flat $0.09 per GB for outbound (approx)
    return dataOutGb * 0.09
  }, [dataOutGb])

  const computeMonthly = useMemo(() => {
    return hourlyRate * hoursPerMonth
  }, [hourlyRate, hoursPerMonth])

  const totalMonthly = useMemo(() => {
    return computeMonthly + storageMonthly + dataOutMonthly
  }, [computeMonthly, storageMonthly, dataOutMonthly])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">AWS Price Predictor</h1>
      <p className="text-center text-gray-500 mb-8">A quick, approximate estimator to help you ballpark monthly costs. These are estimates only.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Configuration</h2>

          <label className="block text-sm font-medium text-gray-700">Instance type</label>
          <select value={instanceType} onChange={(e) => setInstanceType(e.target.value)} className="mt-2 mb-4 w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2">
            {Object.keys(INSTANCE_TYPES).map((k) => (
              <option key={k} value={k}>{k} — ${INSTANCE_TYPES[k].hourly}/hr</option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700">Or custom hourly rate (USD/hour)</label>
          <input value={customHourly} onChange={(e) => setCustomHourly(e.target.value)} placeholder="Leave blank to use instance rate" className="mt-2 mb-4 w-full rounded-md border border-gray-200 px-3 py-2" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hours / month</label>
              <input type="number" min={0} value={hoursPerMonth} onChange={(e) => setHoursPerMonth(Number(e.target.value))} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Outbound data (GB)</label>
              <input type="number" min={0} value={dataOutGb} onChange={(e) => setDataOutGb(Number(e.target.value))} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2" />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Storage (GB)</label>
            <div className="flex gap-3 mt-2">
              <input type="number" min={0} value={storageGb} onChange={(e) => setStorageGb(Number(e.target.value))} className="w-24 rounded-md border border-gray-200 px-3 py-2" />
              <select value={storageType} onChange={(e) => setStorageType(e.target.value)} className="rounded-md border border-gray-200 px-3 py-2 bg-gray-50">
                <option value="gp3">gp3 (General Purpose)</option>
                <option value="gp2">gp2</option>
                <option value="standard">S3 Standard-like (object)</option>
              </select>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Note: This is a simplified estimator for planning only. For exact pricing use the AWS Pricing Calculator or check your chosen region.</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Estimate</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">Instance hourly rate</div>
                <div className="font-medium">${hourlyRate.toFixed(4)} / hr</div>
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-gray-600">Compute ({hoursPerMonth} hrs)</div>
                <div className="font-medium">${computeMonthly.toFixed(2)} / mo</div>
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-gray-600">Storage ({storageGb} GB · {storageType})</div>
                <div className="font-medium">${storageMonthly.toFixed(2)} / mo</div>
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-gray-600">Data out ({dataOutGb} GB)</div>
                <div className="font-medium">${dataOutMonthly.toFixed(2)} / mo</div>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Estimated monthly total</div>
                  <div className="text-xs text-gray-400">(rounded)</div>
                </div>
                <div className="text-2xl font-bold">${totalMonthly.toFixed(2)} / mo</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Tip: Toggle a custom hourly rate to model reserved instances or savings plans.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
