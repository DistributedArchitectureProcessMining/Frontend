import './HistogramVisualizer.scss';
import {useState, useEffect} from 'react';
// import Histogram from 'react-chart-histogram';
import { Chart } from "react-google-charts";
import {GetFileText} from '../../../Services/RepositoryServices';

function HistogramVisualizer(props) {
    const {
        file,
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [fileContent, setFileContent] = useState([]);

    useEffect(() => {
        setIsLoading(false);

        if(file.ResourceType === 'EventStream'){
            setInterval(() => {
                GetFileText().then( res => setFileContent(res.data) )
            }, 500)
        }
    }, []);

    if(isLoading){
        return (
            <div className="HistogramVisualizer">
                <div>Loading ...</div>
            </div>
        )
    }

    // const convertFileContentToHistogramData = (fileContent) => {
    //     const data = ["Events", "Occurances"];
    // }

    const convertFileToHistogramOptions = (file) => {
        return {chart: {
            title: `${file.ResourceLabel}`,
            subtitle: "Occurances of events"
        }}
    }
    
    const data = [
        ["Events", "Occurances",],
        ["Event1", 1000,],
        ["Event2", 1170,],
        ["Event3", 660,],
        ["2017", 1030],
    ];

    // const options = {
    //     chart: {
    //         title: "<fileName>.<fileExtension>",
    //         subtitle: "Occurance chart of events",
    //     },
    // };

    return (
        <div className="HistogramVisualizer">
            <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={data}
                options={convertFileToHistogramOptions(file)}
            />
        </div>
    )
}

export default HistogramVisualizer;
