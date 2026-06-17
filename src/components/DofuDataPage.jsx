import { DOFU_RAW } from '../data/dofuRaw';
import { IconTarget } from '../icons/Icons';

export default function DofuDataPage() {
  return (
    <div>
      <div className="dofu-banner">
        <div className="dofu-banner-icon">
          <IconTarget />
        </div>
        <div>
          <div className="dofu-banner-text">DOFU Data Collection — Rhema City University College</div>
          <div className="dofu-banner-sub">Collected by the Dept. of Outreach & Follow Up for effective ministry discharge</div>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Programme / Occupation</th>
              <th>Residence</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {DOFU_RAW.map((d, i) => (
              <tr key={d.name + i}>
                <td style={{ color: 'var(--muted)', fontSize: 11 }}>{i + 1}</td>
                <td><strong>{d.name}</strong></td>
                <td style={{ fontSize: 11, color: 'var(--muted)' }}>{d.occupation}</td>
                <td style={{ fontSize: 11 }}>{d.residence}</td>
                <td style={{ fontSize: 11, color: 'var(--royal)', fontWeight: 600 }}>{d.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
