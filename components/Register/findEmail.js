export default function findEmail(email) {
    let sEmail = email.indexOf(email);
    if(email.indexOf("uab.edu") != -1) {
        return {
            university: 'University of Alabama School of Medicine',
            state: 'Alabama',
            email: email,
            univerId: 'UniversityofAlabamaSchoolofMedicine'
        }
    } 
    else if(email.indexOf("southalabama.edu") != -1) {
        return {
            university: 'University of South Alabama College of Medicine',
            state: 'Alabama',
            email: email,
            univerId: 'UniversityofSouthAlabamaCollegeofMedicine'
        }
    }
    else if(email.indexOf("arizona.edu") != -1) {
        return {
            university: 'University of Arizona College of Medicine',
            state: 'Arizona',
            email: email,
            univerId: 'UniversityofArizonaCollegeofMedicine'
        }
    }
    else if(email.indexOf("uams.edu") != -1) {
        return {
            university: 'University of Arkansas for Medical Sciences College of Medicine',
            state: 'Arkansas',
            email: email,
            univerId: 'UniversityofArkansasforMedicalSciencesCollegeofMedicine'
        }
    }
    else if(email.indexOf("calmedu.org") != -1) {
        return {
            university: 'California University of Science and Medicine School of Medicine',
            state: 'California',
            email: email,
            univerId: 'CaliforniaUniversityofScienceandMedicineSchoolofMedicine'
        }
    }
    else if(email.indexOf("usc.edu") != -1) {
        return {
            university: 'Keck School of Medicine of the University of Southern California',
            state: 'California',
            email: email,
            univerId: 'KeckSchoolofMedicineoftheUniversityofSouthernCalifornia'
        }
    }
    else if(email.indexOf("stanford.edu") != -1) {
        return {
            university: 'Stanford University School of Medicine',
            state: 'California',
            email: email,
            univerId: 'StanfordUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("llu.edu") != -1) {
        return {
            university: 'Loma Linda University School of Medicine',
            state: 'California',
            email: email,
            univerId: 'LomaLindaUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("ucdavis.edu") != -1) {
        return {
            university: 'University of California, Davis, School of Medicine',
            state: 'California',
            email: email,
            univerId: 'UniversityofCaliforniaDavisSchoolofMedicine'
        }
    }
    else if(email.indexOf("uci.edu") != -1) {
        return {
            university: 'University of California, Irvine, School of Medicine',
            state: 'California',
            email: email,
            univerId: 'UniversityofCaliforniaIrvineSchoolofMedicine'
        }
    }
    else if(email.indexOf("ucla.edu") != -1) {
        return {
            university: 'University of California, Los Angeles, David Geffen School of Medicine',
            state: 'California',
            email: email,
            univerId: 'UniversityofCaliforniaLosAngelesDavidGeffenSchoolofMedicine'
        }
    }
    else if(email.indexOf("ucsd.edu") != -1) {
        return {
            university: 'University of California, San Diego, School of Medicine',
            state: 'California',
            email: email,
            univerId: 'UniversityofCaliforniaSanDiegoSchoolofMedicine'
        }
    }
    else if(email.indexOf("ucsf.edu") != -1) {
        return {
            university: 'University of California, San Francisco, School of Medicine',
            state: 'California',
            email: email,
            univerId: 'UniversityofCaliforniaSanFranciscoSchoolofMedicine'
        }
    }
    else if(email.indexOf("ucdenver.edu") != -1) {
        return {
            university: 'University of Colorado School of Medicine',
            state: 'California',
            email: email,
            univerId: 'UniversityofColoradoSchoolofMedicine'
        }
    }
    else if(email.indexOf("uchc.edu") != -1) {
        return {
            university: 'University of Connecticut School of Medicine',
            state: 'Connecticut',
            email: email,
            univerId: 'UniversityofConnecticutSchoolofMedicine'
        }
    }
    else if(email.indexOf("yale.edu") != -1) {
        return {
            university: 'Yale University School of Medicine',
            state: 'Connecticut',
            email: email,
            univerId: 'YaleUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("gwu.edu") != -1) {
        return {
            university: 'The George Washington University School of Medicine and Health Sciences',
            state: 'District of Columbia',
            email: email,
            univerId: 'TheGeorgeWashingtonUniversitySchoolofMedicineandHealthSciences'
        }
    }
    else if(email.indexOf("georgetown.edu") != -1) {
        return {
            university: 'Georgetown University School of Medicine',
            state: 'District of Columbia',
            email: email,
            univerId: 'GeorgetownUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("howard.edu") != -1) {
        return {
            university: 'Howard University College of Medicine',
            state: 'District of Columbia',
            email: email,
            univerId: 'GeorgetownUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("fau.edu") != -1) {
        return {
            university: 'Florida Atlantic University Charles E. Schmidt College of Medicine',
            state: 'Florida',
            email: email,
            univerId: 'FloridaAtlanticUniversityCharlesESchmidtCollegeofMedicine'
        }
    }
    else if(email.indexOf("fiu.edu") != -1) {
        return {
            university: 'Florida International University Herbert Wertheim College of Medicine',
            state: 'Florida',
            email: email,
            univerId: 'FloridaAtlanticUniversityCharlesESchmidtCollegeofMedicine'
        }
    }
    else if(email.indexOf("fsu.edu") != -1) {
        return {
            university: 'Florida State University College of Medicine',
            state: 'Florida',
            email: email,
            univerId: 'FloridaStateUniversityCollegeofMedicine'
        }
    }
    else if(email.indexOf("ucf.edu") != -1) {
        return {
            university: 'University of Central Florida College of Medicine',
            state: 'Florida',
            email: email,
            univerId: 'UniversityofCentralFloridaCollegeofMedicine'
        }
    }
    else if(email.indexOf("ufl.edu") != -1) {
        return {
            university: 'University of Florida College of Medicine',
            state: 'Florida',
            email: email,
            univerId: 'UniversityofFloridaCollegeofMedicine'
        }
    }
    else if(email.indexOf("miami.edu") != -1) {
        return {
            university: 'University of Miami Miller School of Medicine',
            state: 'Florida',
            email: email,
            univerId: 'UniversityofMiamiMillerSchoolofMedicine'
        }
    }
    else if(email.indexOf("usf.edu") != -1) {
        return {
            university: 'University of South Florida College of Medicine',
            state: 'Florida',
            email: email,
            univerId: 'UniversityofSouthFloridaCollegeofMedicine'
        }
    }
    else if(email.indexOf("emory.edu") != -1) {
        return {
            university: 'Emory University School of Medicine',
            state: 'Georgia',
            email: email,
            univerId: 'EmoryUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("mcg.edu") != -1) {
        return {
            university: 'Medical College of Georgia at Georgia Health Sciences University',
            state: 'Georgia',
            email: email,
            univerId: 'MedicalCollegeofGeorgiaatGeorgiaHealthSciencesUniversity'
        }
    }
    else if(email.indexOf("mercer.edu") != -1) {
        return {
            university: 'Mercer University School of Medicine',
            state: 'Georgia',
            email: email,
            univerId: 'MercerUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("msm.edu") != -1) {
        return {
            university: 'Morehouse School of Medicine',
            state: 'Georgia',
            email: email,
            univerId: 'MorehouseSchoolofMedicine'
        }
    }
    else if(email.indexOf("hawaii.edu") != -1) {
        return {
            university: 'University of Hawaii at Manoa John A. Burns School of Medicine',
            state: 'Hawaii',
            email: email,
            univerId: 'UniversityofHawaiiatManoaJohnABurnsSchoolofMedicine'
        }
    }
    else if(email.indexOf("rosalindfranklin.edu") != -1) {
        return {
            university: 'Chicago Medical School at Rosalind Franklin University of Medicine and Science',
            state: 'Illinois',
            email: email,
            univerId: 'ChicagoMedicalSchoolatRosalindFranklinUniversityofMedicineandScience'
        }
    }
    else if(email.indexOf("luc.edu") != -1) {
        return {
            university: 'Loyola University Chicago Stritch School of Medicine',
            state: 'Illinois',
            email: email,
            univerId: 'LoyolaUniversityChicagoStritchSchoolofMedicine'
        }
    }
    else if(email.indexOf("northwestern.edu") != -1) {
        return {
            university: 'Northwestern University Feinberg School of Medicine',
            state: 'Illinois',
            email: email,
            univerId: 'NorthwesternUniversityFeinbergSchoolofMedicine'
        }
    }
    else if(email.indexOf("rush.edu") != -1) {
        return {
            university: 'Rush Medical College of Rush University Medical Center',
            state: 'Illinois',
            email: email,
            univerId: 'RushMedicalCollegeofRushUniversityMedicalCenter'
        }
    }
    else if(email.indexOf("siumed.edu") != -1) {
        return {
            university: 'Southern Illinois University School of Medicine',
            state: 'Illinois',
            email: email,
            univerId: 'SouthernIllinoisUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("uchicago.edu") != -1) {
        return {
            university: 'University of Chicago Pritzker School of Medicine',
            state: 'Illinois',
            email: email,
            univerId: 'UniversityofChicagoPritzkerSchoolofMedicine'
        }
    }
    else if(email.indexOf("uic.edu") != -1) {
        return {
            university: 'University of Illinois College of Medicine',
            state: 'Illinois',
            email: email,
            univerId: 'UniversityofIllinoisCollegeofMedicine'
        }
    }
    else if(email.indexOf("iu.edu") != -1) {
        return {
            university: 'Indiana University School of Medicine',
            state: 'Indiana',
            email: email,
            univerId: 'IndianaUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("uiowa.edu") != -1) {
        return {
            university: 'University of Iowa Carver College of Medicine',
            state: 'Iowa',
            email: email,
            univerId: 'UniversityofIowaCarverCollegeofMedicine'
        }
    }
    else if(email.indexOf("kumc.edu") != -1) {
        return {
            university: 'University of Kansas Medical Center',
            state: 'Kansas',
            email: email,
            univerId: 'UniversityofKansasMedicalCenter'
        }
    }
    else if(email.indexOf("uky.edu") != -1) {
        return {
            university: 'University of Kentucky College of Medicine',
            state: 'Kentucky',
            email: email,
            univerId: 'UniversityofKentuckyCollegeofMedicine'
        }
    }
    else if(email.indexOf("louisville.edu") != -1) {
        return {
            university: 'University of Louisville School of Medicine',
            state: 'Kentucky',
            email: email,
            univerId: 'UniversityofLouisvilleSchoolofMedicine'
        }
    }
    else if(email.indexOf("lsuhsc.edu") != -1) {
        return {
            university: 'Louisiana State University School of Medicine in New Orleans',
            state: 'Louisiana',
            email: email,
            univerId: 'LouisianaStateUniversitySchoolofMedicineinNewOrleans'
        }
    }
    else if(email.indexOf("lsuhscshreveport.edu") != -1) {
        return {
            university: 'Louisiana State University School of Medicine in Shreveport',
            state: 'Louisiana',
            email: email,
            univerId: 'LouisianaStateUniversitySchoolofMedicineinShreveport'
        }
    }
    else if(email.indexOf("tulane.edu") != -1) {
        return {
            university: 'Tulane University School of Medicine',
            state: 'Louisiana',
            email: email,
            univerId: 'TulaneUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("jhmi.edu") != -1) {
        return {
            university: 'Johns Hopkins University School of Medicine',
            state: 'Maryland',
            email: email,
            univerId: 'JohnsHopkinsUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("usuhs.edu") != -1) {
        return {
            university: 'Uniformed Services University of the Health Sciences School of Medicine',
            state: 'Maryland',
            email: email,
            univerId: 'UniformedServicesUniversityoftheHealthSciencesSchoolofMedicine'
        }
    }
    else if(email.indexOf("umaryland.edu") != -1) {
        return {
            university: 'University of Maryland School of Medicine',
            state: 'Maryland',
            email: email,
            univerId: 'UniversityofMarylandSchoolofMedicine'
        }
    }
    else if(email.indexOf("bu.edu") != -1) {
        return {
            university: 'Boston University School of Medicine',
            state: 'Massachusetts',
            email: email,
            univerId: 'BostonUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("harvard.edu") != -1) {
        return {
            university: 'Harvard Medical School',
            state: 'Massachusetts',
            email: email,
            univerId: 'HarvardMedicalSchool'
        }
    }
    else if(email.indexOf("tufts.edu") != -1) {
        return {
            university: 'Tufts University School of Medicine',
            state: 'Massachusetts',
            email: email,
            univerId: 'TuftsUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("umassmed.edu") != -1) {
        return {
            university: 'University of Massachusetts Medical School',
            state: 'Massachusetts',
            email: email,
            univerId: 'UniversityofMassachusettsMedicalSchool'
        }
    }
    else if(email.indexOf("msu.edu") != -1) {
        return {
            university: 'Michigan State University College of Human Medicine',
            state: 'Michigan',
            email: email,
            univerId: 'MichiganStateUniversityCollegeofHumanMedicine'
        }
    }
    else if(email.indexOf("oakland.edu") != -1) {
        return {
            university: 'Oakland University William Beaumont School of Medicine',
            state: 'Michigan',
            email: email,
            univerId: 'OaklandUniversityWilliamBeaumontSchoolofMedicine'
        }
    }
    else if(email.indexOf("umich.edu") != -1) {
        return {
            university: 'University of Michigan Medical School',
            state: 'Michigan',
            email: email,
            univerId: 'UniversityofMichiganMedicalSchool'
        }
    }
    else if(email.indexOf("wayne.edu") != -1) {
        return {
            university: 'Wayne State University School of Medicine',
            state: 'Michigan',
            email: email,
            univerId: 'WayneStateUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("may.edu") != -1) {
        return {
            university: 'Mayo Medical School',
            state: 'Minnesota',
            email: email,
            univerId: 'MayoMedicalSchool'
        }
    }
    else if(email.indexOf("umn.edu") != -1) {
        return {
            university: 'University of Minnesota Medical School',
            state: 'Minnesota',
            email: email,
            univerId: 'UniversityofMinnesotaMedicalSchool'
        }
    }
    else if(email.indexOf("umc.edu") != -1) {
        return {
            university: 'University of Mississippi School of Medicine',
            state: 'Mississippi',
            email: email,
            univerId: 'UniversityofMississippiSchoolofMedicine'
        }
    }
    else if(email.indexOf("slu.edu") != -1) {
        return {
            university: 'Saint Louis University School of Medicine',
            state: 'Missouri',
            email: email,
            univerId: 'SaintLouisUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("missouri.edu") != -1) {
        return {
            university: 'University of Missouri-Columbia School of Medicine',
            state: 'Missouri',
            email: email,
            univerId: 'UniversityofMissouri-ColumbiaSchoolofMedicine'
        }
    }
    else if(email.indexOf("umkc.edu") != -1) {
        return {
            university: 'University of Missouri-Kansas City School of Medicine',
            state: 'Missouri',
            email: email,
            univerId: 'UniversityofMissouri-KansasCitySchoolofMedicine'
        }
    }
    else if(email.indexOf("wustl.edu") != -1) {
        return {
            university: 'Washington University School of Medicine in St. Louis',
            state: 'Missouri',
            email: email,
            univerId: 'WashingtonUniversitySchoolofMedicineinStLouis'
        }
    }
    else if(email.indexOf("creighton.edu") != -1) {
        return {
            university: 'Creighton University School of Medicine',
            state: 'Nebraska',
            email: email,
            univerId: 'CreightonUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("unmc.edu") != -1) {
        return {
            university: 'University of Nebraska College of Medicine',
            state: 'Nebraska',
            email: email,
            univerId: 'UniversityofNebraskaCollegeofMedicine'
        }
    }
    else if(email.indexOf("unr.edu") != -1) {
        return {
            university: 'University of Nevada School of Medicine',
            state: 'Nevada',
            email: email,
            univerId: 'UniversityofNevadaSchoolofMedicine'
        }
    }
    else if(email.indexOf("dartmouth.edu") != -1) {
        return {
            university: 'Dartmouth Medical School',
            state: 'New Hampshire',
            email: email,
            univerId: 'DartmouthMedicalSchool'
        }
    }
    else if(email.indexOf("njms.rutgers.edu") != -1) {
        return {
            university: 'University of Medicine and Dentistry of New Jersey-New Jersey Medical School',
            state: 'New Jersey',
            email: email,
            univerId: 'UniversityofMedicineandDentistryofNewJersey-NewJerseyMedicalSchool'
        }
    }
    else if(email.indexOf("rwjms.rutgers.edu") != -1) {
        return {
            university: 'University of Medicine and Dentistry of New Jersey-Robert Wood Johnson Medical School',
            state: 'New Jersey',
            email: email,
            univerId: 'UniversityofMedicineandDentistryofNewJersey-RobertWoodJohnsonMedicalSchool'
        }
    }
    else if(email.indexOf("unm.edu") != -1) {
        return {
            university: 'University of New Mexico School of Medicine',
            state: 'New Mexico',
            email: email,
            univerId: 'UniversityofNewMexicoSchoolofMedicine'
        }
    }
    else if(email.indexOf("amc.edu") != -1) {
        return {
            university: 'Albany Medical College',
            state: 'New York',
            email: email,
            univerId: 'AlbanyMedicalCollege'
        }
    }
    else if(email.indexOf("yu.edu") != -1) {
        return {
            university: 'Albert Einstein College of Medicine of Yeshiva University',
            state: 'New York',
            email: email,
            univerId: 'AlbertEinsteinCollegeofMedicineofYeshivaUniversity'
        }
    }
    else if(email.indexOf("cuny.edu") != -1) {
        return {
            university: 'City College of New York',
            state: 'New York',
            email: email,
            univerId: 'CityCollegeofNewYork'
        }
    }
    else if(email.indexOf("columbia.edu") != -1) {
        return {
            university: 'Columbia University College of Physicians and Surgeons',
            state: 'New York',
            email: email,
            univerId: 'ColumbiaUniversityCollegeofPhysiciansandSurgeons'
        }
    }
    else if(email.indexOf("hofstra.edu") != -1) {
        return {
            university: 'Hofstra North Shore - LIJ School of Medicine',
            state: 'New York',
            email: email,
            univerId: 'HofstraNorthShore-LIJSchoolofMedicine'
        }
    }
    else if(email.indexOf("mssm.edu") != -1) {
        return {
            university: 'Mount Sinai School of Medicine',
            state: 'New York',
            email: email,
            univerId: 'MountSinaiSchoolofMedicine'
        }
    }
    else if(email.indexOf("nymc.edu") != -1) {
        return {
            university: 'New York Medical College',
            state: 'New York',
            email: email,
            univerId: 'NewYorkMedicalCollege'
        }
    }
    else if(email.indexOf("nyu.edu") != -1) {
        return {
            university: 'New York University School of Medicine',
            state: 'New York',
            email: email,
            univerId: 'NewYorkUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("stonybrookmedicine.edu") != -1) {
        return {
            university: 'The School of Medicine at Stony Brook University Medical Center',
            state: 'New York',
            email: email,
            univerId: 'TheSchoolofMedicineatStonyBrookUniversityMedicalCenter'
        }
    }
    else if(email.indexOf("downstate.edu") != -1) {
        return {
            university: 'State University of New York Downstate Medical Center College of Medicine',
            state: 'New York',
            email: email,
            univerId: 'StateUniversityofNewYorkDownstateMedicalCenterCollegeofMedicine'
        }
    }
    else if(email.indexOf("upstate.edu") != -1) {
        return {
            university: 'State University of New York Upstate Medical University',
            state: 'New York',
            email: email,
            univerId: 'StateUniversityofNewYorkUpstateMedicalUniversity'
        }
    }
    else if(email.indexOf("buffalo.edu") != -1) {
        return {
            university: 'University at Buffalo State University of New York School of Medicine and Biomedical Sciences',
            state: 'New York',
            email: email,
            univerId: 'UniversityatBuffaloStateUniversityofNewYorkSchoolofMedicineandBiomedicalSciences'
        }
    }
    else if(email.indexOf("rochester.edu") != -1) {
        return {
            university: 'University of Rochester School of Medicine and Dentistry',
            state: 'New York',
            email: email,
            univerId: 'UniversityofRochesterSchoolofMedicineandDentistry'
        }
    }
    else if(email.indexOf("cornell.edu") != -1) {
        return {
            university: 'Weill Cornell Medical College',
            state: 'New York',
            email: email,
            univerId: 'WeillCornellMedicalCollege'
        }
    }
    else if(email.indexOf("ecu.edu") != -1) {
        return {
            university: 'The Brody School of Medicine at East Carolina University',
            state: 'North Carolina',
            email: email,
            univerId: 'TheBrodySchoolofMedicineatEastCarolinaUniversity'
        }
    }
    else if(email.indexOf("duke.edu") != -1) {
        return {
            university: 'Duke University School of Medicine',
            state: 'North Carolina',
            email: email,
            univerId: 'DukeUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("unc.edu") != -1) {
        return {
            university: 'University of North Carolina at Chapel Hill School of Medicine',
            state: 'North Carolina',
            email: email,
            univerId: 'UniversityofNorthCarolinaatChapelHillSchoolofMedicine'
        }
    }
    else if(email.indexOf("wakehealth.edu") != -1) {
        return {
            university: 'Wake Forest University School of Medicine',
            state: 'North Carolina',
            email: email,
            univerId: 'WakeForestUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("und.edu") != -1) {
        return {
            university: 'University of North Dakota School of Medicine and Health Sciences',
            state: 'North Dakota',
            email: email,
            univerId: 'UniversityofNorthDakotaSchoolofMedicineandHealthSciences'
        }
    }
    else if(email.indexOf("case.edu") != -1) {
        return {
            university: 'Case Western Reserve University School of Medicine',
            state: 'Ohio',
            email: email,
            univerId: 'CaseWesternReserveUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("neomed.edu") != -1) {
        return {
            university: 'Northeastern Ohio Universities Colleges of Medicine and Pharmacy',
            state: 'Ohio',
            email: email,
            univerId: 'NortheasternOhioUniversitiesCollegesofMedicineandPharmacy'
        }
    }
    else if(email.indexOf("osu.edu") != -1) {
        return {
            university: 'Ohio State University College of Medicine',
            state: 'Ohio',
            email: email,
            univerId: 'OhioStateUniversityCollegeofMedicine'
        }
    }
    else if(email.indexOf("uc.edu") != -1) {
        return {
            university: 'University of Cincinnati College of Medicine',
            state: 'Ohio',
            email: email,
            univerId: 'UniversityofCincinnatiCollegeofMedicine'
        }
    }
    else if(email.indexOf("utoledo.edu") != -1) {
        return {
            university: 'University of Toledo College of Medicine',
            state: 'Ohio',
            email: email,
            univerId: 'UniversityofToledoCollegeofMedicine'
        }
    }
    else if(email.indexOf("wright.edu") != -1) {
        return {
            university: 'Wright State University Boonshoft School of Medicine',
            state: 'Ohio',
            email: email,
            univerId: 'WrightStateUniversityBoonshoftSchoolofMedicine'
        }
    }
    else if(email.indexOf("ouhsc.edu") != -1) {
        return {
            university: 'University of Oklahoma College of Medicine',
            state: 'Oklahoma',
            email: email,
            univerId: 'UniversityofOklahomaCollegeofMedicine'
        }
    }
    else if(email.indexOf("ohsu.edu") != -1) {
        return {
            university: 'Oregon Health & Science University School of Medicine',
            state: 'Oregon',
            email: email,
            univerId: 'OregonHealth&ScienceUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("ohsu.edu") != -1) {
        return {
            university: 'Oregon Health & Science University School of Medicine',
            state: 'Oregon',
            email: email,
            univerId: 'OregonHealth&ScienceUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("geisinger.edu") != -1) {
        return {
            university: 'Geisinger Commonwealth School of Medicine',
            state: 'Pennsylvania',
            email: email,
            univerId: 'GeisingerCommonwealthSchoolofMedicine'
        }
    }
    else if(email.indexOf("drexelmed.edu") != -1) {
        return {
            university: 'Drexel University College of Medicine',
            state: 'Pennsylvania',
            email: email,
            univerId: 'DrexelUniversityCollegeofMedicine'
        }
    }
    else if(email.indexOf("jefferson.edu") != -1) {
        return {
            university: 'Jefferson Medical College of Thomas Jefferson University',
            state: 'Pennsylvania',
            email: email,
            univerId: 'JeffersonMedicalCollegeofThomasJeffersonUniversity'
        }
    }
    else if(email.indexOf("psu.edu") != -1) {
        return {
            university: 'Pennsylvania State University College of Medicine',
            state: 'Pennsylvania',
            email: email,
            univerId: 'PennsylvaniaStateUniversityCollegeofMedicine'
        }
    }
    else if(email.indexOf("upenn.edu") != -1) {
        return {
            university: 'Perelman School of Medicine at the University of Pennsylvania',
            state: 'Pennsylvania',
            email: email,
            univerId: 'PerelmanSchoolofMedicineattheUniversityofPennsylvania'
        }
    }
    else if(email.indexOf("temple.edu") != -1) {
        return {
            university: 'Temple University School of Medicine',
            state: 'Pennsylvania',
            email: email,
            univerId: 'TempleUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("pitt.edu") != -1) {
        return {
            university: 'University of Pittsburgh School of Medicine',
            state: 'Pennsylvania',
            email: email,
            univerId: 'UniversityofPittsburghSchoolofMedicine'
        }
    }
    else if(email.indexOf("psm.edu") != -1) {
        return {
            university: 'Ponce School of Medicine and Health Sciences',
            state: 'Puerto Rico',
            email: email,
            univerId: 'PonceSchoolofMedicineandHealthSciences'
        }
    }
    else if(email.indexOf("sanjuanbautista.edu") != -1) {
        return {
            university: 'San Juan Bautista School of Medicine',
            state: 'Puerto Rico',
            email: email,
            univerId: 'SanJuanBautistaSchoolofMedicine'
        }
    }
    else if(email.indexOf("uccaribe.edu") != -1) {
        return {
            university: 'Universidad Central del Caribe School of Medicine',
            state: 'Puerto Rico',
            email: email,
            univerId: 'UniversidadCentraldelCaribeSchoolofMedicine'
        }
    }
    else if(email.indexOf("upr.edu") != -1) {
        return {
            university: 'University of Puerto Rico School of Medicine',
            state: 'Puerto Rico',
            email: email,
            univerId: 'UniversidadCentraldelCaribeSchoolofMedicine'
        }
    }
    else if(email.indexOf("brown.edu") != -1) {
        return {
            university: 'The Warren Alpert Medical School of Brown University',
            state: 'Rhode Island',
            email: email,
            univerId: 'TheWarrenAlpertMedicalSchoolofBrownUniversity'
        }
    }
    else if(email.indexOf("musc.edu") != -1) {
        return {
            university: 'Medical University of South Carolina College of Medicine',
            state: 'South Carolina',
            email: email,
            univerId: 'MedicalUniversityofSouthCarolinaCollegeofMedicine'
        }
    }
    else if(email.indexOf("sc.edu") != -1) {
        return {
            university: 'University of South Carolina School of Medicine',
            state: 'South Carolina',
            email: email,
            univerId: 'UniversityofSouthCarolinaSchoolofMedicine'
        }
    }
    else if(email.indexOf("usd.edu") != -1) {
        return {
            university: 'Sanford School of Medicine The University of South Dakota',
            state: 'South Dakota',
            email: email,
            univerId: 'SanfordSchoolofMedicineTheUniversityofSouthDakota'
        }
    }
    else if(email.indexOf("etsu.edu") != -1) {
        return {
            university: 'East Tennessee State University James H. Quillen College of Medicine',
            state: 'Tennessee',
            email: email,
            univerId: 'EastTennesseeStateUniversityJamesHQuillenCollegeofMedicine'
        }
    }
    else if(email.indexOf("mmc.edu") != -1) {
        return {
            university: 'Meharry Medical College School of Medicine',
            state: 'Tennessee',
            email: email,
            univerId: 'MeharryMedicalCollegeSchoolofMedicine'
        }
    }
    else if(email.indexOf("uthsc.edu") != -1) {
        return {
            university: 'University of Tennessee Health Science Center College of Medicine',
            state: 'Tennessee',
            email: email,
            univerId: 'UniversityofTennesseeHealthScienceCenterCollegeofMedicine'
        }
    }
    else if(email.indexOf("vanderbilt.edu") != -1) {
        return {
            university: 'Vanderbilt University School of Medicine',
            state: 'Tennessee',
            email: email,
            univerId: 'VanderbiltUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("bcm.edu") != -1) {
        return {
            university: 'Baylor College of Medicine',
            state: 'Texas',
            email: email,
            univerId: 'BaylorCollegeofMedicine'
        }
    }
    else if(email.indexOf("tamhsc.edu") != -1) {
        return {
            university: 'Texas A&M Health Science Center College of Medicine',
            state: 'Texas',
            email: email,
            univerId: 'TexasA&MHealthScienceCenterCollegeofMedicine'
        }
    }
    else if(email.indexOf("ttuhsc.edu") != -1) {
        return {
            university: 'Texas Tech University Health Sciences Center Paul L. Foster School of Medicine',
            state: 'Texas',
            email: email,
            univerId: 'TexasTechUniversityHealthSciencesCenterPaulLFosterSchoolofMedicine'
        }
    }
    else if(email.indexOf("utmb.edu") != -1) {
        return {
            university: 'University of Texas Medical Branch School at Galveston School of Medicine',
            state: 'Texas',
            email: email,
            univerId: 'UniversityofTexasMedicalBranchSchoolatGalvestonSchoolofMedicine'
        }
    }
    else if(email.indexOf("uth.edu") != -1) {
        return {
            university: 'University of Texas Medical School at Houston',
            state: 'Texas',
            email: email,
            univerId: 'UniversityofTexasMedicalSchoolatHouston'
        }
    }
    else if(email.indexOf("uthscsa.edu") != -1) {
        return {
            university: 'University of Texas Medical School at San Antonio',
            state: 'Texas',
            email: email,
            univerId: 'UniversityofTexasMedicalSchoolatSanAntonio'
        }
    }
    else if(email.indexOf("utsouthwestern.edu") != -1) {
        return {
            university: 'University of Texas Southwestern Medical Center at Dallas Southwestern Medical School',
            state: 'Texas',
            email: email,
            univerId: 'UniversityofTexasSouthwesternMedicalCenteratDallasSouthwesternMedicalSchool'
        }
    }
    else if(email.indexOf("utah.edu") != -1) {
        return {
            university: 'University of Utah School of Medicine',
            state: 'Utah',
            email: email,
            univerId: 'UniversityofUtahSchoolofMedicine'
        }
    }
    else if(email.indexOf("uvm.edu") != -1) {
        return {
            university: 'University of Vermont College of Medicine',
            state: 'Vermont',
            email: email,
            univerId: 'UniversityofVermontCollegeofMedicine'
        }
    }
    else if(email.indexOf("evms.edu") != -1) {
        return {
            university: 'Eastern Virginia Medical School',
            state: 'Virginia',
            email: email,
            univerId: 'EasternVirginiaMedicalSchool'
        }
    }
    else if(email.indexOf("virginia.edu") != -1) {
        return {
            university: 'University of Virginia School of Medicine',
            state: 'Virginia',
            email: email,
            univerId: 'UniversityofVirginiaSchoolofMedicine'
        }
    }
    else if(email.indexOf("vcu.edu") != -1) {
        return {
            university: 'Virginia Commonwealth University School of Medicine',
            state: 'Virginia',
            email: email,
            univerId: 'VirginiaCommonwealthUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("vt.edu") != -1) {
        return {
            university: 'Virginia Tech Carilion School of Medicine',
            state: 'Virginia',
            email: email,
            univerId: 'VirginiaTechCarilionSchoolofMedicine'
        }
    }
    else if(email.indexOf("washington.edu") != -1) {
        return {
            university: 'University of Washington School of Medicine',
            state: 'Washington',
            email: email,
            univerId: 'UniversityofWashingtonSchoolofMedicine'
        }
    }
    else if(email.indexOf("marshall.edu") != -1) {
        return {
            university: 'Marshall University Joan C. Edwards School of Medicine',
            state: 'West Virginia',
            email: email,
            univerId: 'MarshallUniversityJoanCEdwardsSchoolofMedicine'
        }
    }
    else if(email.indexOf("wvu.edu") != -1) {
        return {
            university: 'West Virginia University School of Medicine',
            state: 'West Virginia',
            email: email,
            univerId: 'WestVirginiaUniversitySchoolofMedicine'
        }
    }
    else if(email.indexOf("mcw.edu") != -1) {
        return {
            university: 'Medical College of Wisconsin',
            state: 'Wisconsin',
            email: email,
            univerId: 'MedicalCollegeofWisconsin'
        }
    }

    else {
        return {
            university: 'Other',
            state: 'Other',
            email: email,
            univerId: 'Other'
        }
    }
}