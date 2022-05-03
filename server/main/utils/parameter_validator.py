""" Validate Hyper-Parameters
"""
import re
import json

from river.optim import (
    AMSGrad, AdaBound, AdaDelta, AdaGrad, AdaMax,
    Adam, Averager, FTRLProximal, Momentum, Nadam,
    NesterovMomentum, RMSProp, SGD
)
from river.optim.losses import (
    BinaryFocalLoss, Hinge, Log
)
from river.optim.schedulers import (
    Constant as ConstScheduler, InverseScaling, Optimal
)
from river.optim.initializers import (
    Constant, Normal, Zeros
)
from river.metrics import (
    Accuracy, BalancedAccuracy, FowlkesMallows,
    GeometricMean, CohenKappa, Rand, ClassificationReport
)
from river.drift import (
    ADWIN, DDM, EDDM, HDDM_A, HDDM_W, KSWIN, PageHinkley
)
from river.tree.splitter import (
    ExhaustiveSplitter, GaussianSplitter, HistogramSplitter
)


class ModelValidator:
    def __init__(self, p):
        self.p = p
        self.optimizers = [
            AMSGrad(), AdaBound(), AdaDelta(), AdaGrad(),
            AdaMax(), Adam(), Averager(optimizer=SGD()), FTRLProximal(),
            Momentum(), Nadam(), NesterovMomentum(), RMSProp(),
            SGD()
        ]
        self.losses = [
            BinaryFocalLoss(), Hinge(), Log()
        ]
        self.schedulers = [
            ConstScheduler(learning_rate=0.01),
            InverseScaling(learning_rate=0.01),
            Optimal(loss=BinaryFocalLoss())
        ]
        self.initializers = [
            Constant(value=3.14), Normal(), Zeros()
        ]
        self.metrics = [
            Accuracy(), BalancedAccuracy(), FowlkesMallows(),
            GeometricMean(), CohenKappa(), Rand(), ClassificationReport()
        ]
        self.detectors = [
            ADWIN(), DDM(), EDDM(), HDDM_A(), HDDM_W(), KSWIN(),
            PageHinkley(), None
        ]
        self.splitters = [
            ExhaustiveSplitter(), GaussianSplitter(), HistogramSplitter()
        ]

    # Helper Methods
    def mkint(self, val, default):
        if isinstance(val, str) \
                or isinstance(val, float):
            return int(float(val))
        elif isinstance(val, int):
            return val
        else:
            return default

    def mkposint(self, val, default):
        if isinstance(val, str) \
                and int(float(val)) > 0:
            return int(float(val))
        elif isinstance(val, float) \
                and int(val) > 0:
            return int(val)
        elif isinstance(val, int) \
                and val > 0:
            return val
        else:
            return default

    def mkposfloat(self, val, default):
        if isinstance(val, str) \
                and float(val) > 0.0:
            return float(val)
        elif isinstance(val, int) \
                and float(val) > 0.0:
            return float(val)
        elif isinstance(val, float) \
                and val > 0.0:
            return val
        else:
            return default

    def mkfloat(self, val, default):
        if isinstance(val, str) \
                or isinstance(val, int):
            return float(val)
        elif isinstance(val, float):
            return val
        else:
            return default

    def mkbool(self, val, default):
        if val == "true":
            return True
        elif val == "false":
            return False
        else:
            return default

    def mkopt(self, val, opt, default):
        if val in opt:
            return str(val)
        else:
            return default

    def isvalidoption(self, val, opt):
        return val in opt

    def mkdict(self, val):
        d = json.loads(val)
        return {int(float(k)): float(d[k]) for k, v in d.items()}

    def isdict(self, val):
        if val is None:
            return False

        try:
            _ = json.loads(val)

        except json.decoder.JSONDecodeError:
            return False

    # Primary Methods
    def clean_knnb(self):
        data = {}

        weight_opt = ['uniform', 'distance']
        algo_opt = ['auto', 'ball_tree', 'kd_tree', 'brute']

        data['n_neighbors'] = self.mkint(self.p['n_neighbors'], 5)
        data['weights'] = \
            self.mkopt(self.p['weights'], weight_opt, 'uniform')
        data['algorithm'] = \
            self.mkopt(self.p['algorithm_knn'], algo_opt, 'auto')
        data['leaf_size'] = self.mkint(self.p['leaf_size'], 30)
        data['p'] = self.mkint(self.p['p'], 2)
        data['metric'] = 'minkowski'
        data['metric_params'] = None
        data['n_jobs'] = self.mkint(self.p['n_jobs'], None)

        return data

    def clean_knno(self):
        data = {}

        data['n_neighbors'] = self.mkint(self.p['n_neighbors'], 5)
        data['window_size'] = self.mkint(self.p['window_size'], 1000)
        data['leaf_size'] = self.mkint(self.p['leaf_size'], 30)
        data['p'] = self.mkposint(self.p['p'], 2)

        return data

    def clean_logb(self):
        data = {}

        solver_opt = ['newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga']
        penalty_opt = ['l1', 'l2', 'elasticnet', 'none']
        multiclass_opt = ['auto', 'ovr', 'multinomial']

        data['penalty'] = \
            self.mkopt(self.p['penalty'], penalty_opt, 'l2')
        data['dual'] = self.mkbool(self.p['dual'], False)
        data['tol'] = self.mkfloat(self.p['tol'], 1e-4)
        data['C'] = self.mkfloat(self.p['C'], 1.0)
        data['fit_intercept'] = self.mkbool(self.p['fit_intercept'], True)
        data['intercept_scaling'] = \
            self.mkfloat(self.p['intercept_scaling'], 1.0)

        # class_weight
        if self.p['class_weight'] == 'balanced':
            data['class_weight'] = self.p['class_weight']
        elif self.isdict(self.p['class_weight']):
            data['class_weight'] = self.mkdict(self.p['class_weight'])
        else:
            data['class_weight'] = None

        data['random_state'] = self.mkint(self.p['random_state'], None)
        data['solver'] = \
            self.mkopt(self.p['solver'], solver_opt, 'lbfgs')
        data['max_iter'] = self.mkint(self.p['max_iter'], 100)
        data['multi_class'] = \
            self.mkopt(self.p['multi_class'], multiclass_opt, 'auto')
        data['verbose'] = self.mkint(self.p['verbose'], 0)
        data['warm_start'] = self.mkbool(self.p['warm_start'], False)
        data['n_jobs'] = self.mkint(self.p['n_jobs'], None)
        data['l1_ratio'] = self.mkfloat(self.p['l1_ratio'], None)

        return data

    def clean_logo(self):
        data = {}

        # optimizer
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['optimizer'])):
            data['optimizer'] = self.optimizers[int(self.p['optimizer'])]
        else:
            data['optimizer'] = None

        # loss
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['loss'])):
            data['loss'] = self.losses[int(self.p['loss'])]
        else:
            data['loss'] = None

        data['l2'] = self.mkfloat(self.p['l2'], 0.0)
        data['intercept_init'] = self.mkfloat(self.p['intercept_init'], 0.0)

        # intercept_lr
        if self.p['intercept_lr_float'] is not None:
            data['intercept_lr'] = float(self.p['intercept_lr_float'])
        elif self.p['intercept_lr_schdlr'] is not None:
            data['intercept_lr'] = self.schedulers[
                int(float(self.p['intercept_lr_schdlr']))
            ]
        else:
            data['intercept_lr'] = 0.01

        data['clip_gradient'] = \
            self.mkfloat(self.p['clip_gradient'], 1000000000000.0)

        # initializer
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['initializer'])):
            data['initializer'] = self.initializers[int(self.p['initializer'])]
        else:
            data['initializer'] = None

        return data

    def clean_mnbb(self):
        data = {}

        data['alpha'] = self.mkfloat(self.p['alpha'], 1.0)
        data['fit_prior'] = self.mkbool(self.p['fit_prior'], True)

        # class_prior
        if isinstance(self.p['class_prior'], str):
            priors = self.p['class_prior'].split(',')

            for prior in priors:
                if isinstance(prior, str):
                    prior = float(prior)

            data['class_prior'] = priors
        else:
            data['class_prior'] = None

        return data

    def clean_mnbo(self):
        data = {}

        data['alpha'] = self.mkfloat(self.p['alpha'], 1.0)

        return data

    def clean_perb(self):
        data = {}

        penalty_opt = ['l2', 'l1', 'elasticnet']

        data['penalty'] = \
            self.mkopt(self.p['penalty'], penalty_opt, None)
        data['alpha'] = self.mkfloat(self.p['alpha'], 0.0001)

        # l1_ratio
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['l1_ratio'])):
            data['l1_ratio'] = int(float(self.p['l1_ratio']))
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(str(self.p['l1_ratio'])):
            data['l1_ratio'] = float(self.p['l1_ratio'])
        else:
            data['l1_ratio'] = 0.15

        data['fit_intercept'] = self.mkbool(self.p['fit_intercept'], True)
        data['max_iter'] = self.mkint(self.p['max_iter'], 1000)
        data['tol'] = self.mkfloat(self.p['tol'], 1e-3)
        data['shuffle'] = self.mkbool(self.p['shuffle'], True)
        data['verbose'] = self.mkint(self.p['verbose'], 0)
        data['eta0'] = self.mkfloat(self.p['eta0'], 1.0)
        data['n_jobs'] = self.mkint(self.p['n_jobs'], None)
        data['random_state'] = self.mkint(self.p['random_state'], None)
        data['early_stopping'] = self.mkbool(self.p['early_stopping'], False)
        data['validation_fraction'] = \
            self.mkfloat(self.p['validation_fraction'], 0.1)
        data['n_iter_no_change'] = self.mkint(self.p['n_iter_no_change'], 5)

        # class_weight
        if self.p['class_weight'] == 'balanced':
            data['class_weight'] = self.p['class_weight']
        elif self.isdict(self.p['class_weight']):
            data['class_weight'] = self.mkdict(self.p['class_weight'])
        else:
            data['class_weight'] = None

        data['warm_start'] = self.mkbool(self.p['warm_start'], False)

        return data

    def clean_pero(self):
        data = {}

        data['l2'] = self.mkfloat(self.p['l2'], 0.0)
        data['clip_gradient'] = \
            self.mkfloat(self.p['clip_gradient'], 1000000000000.0)

        # initializer
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['initializer'])):
            data['initializer'] = self.initializers[int(self.p['initializer'])]
        else:
            data['initializer'] = None

        return data

    def clean_ranb(self):
        data = {}

        data['n_estimators'] = self.mkint(self.p['n_estimators'], 100)
        data['criterion'] = \
            self.mkopt(self.p['criterion'], ['gini', 'entropy'], 'gini')
        data['max_depth'] = self.mkint(self.p['max_depth'], None)

        # min_samples_split
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['min_samples_split'])):
            data['min_samples_split'] = int(float(self.p['min_samples_split']))
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(self.p['min_samples_split']):
            data['min_samples_split'] = float(self.p['min_samples_split'])
        else:
            data['min_samples_split'] = 2

        # min_samples_leaf
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['min_samples_leaf'])):
            data['min_samples_leaf'] = int(float(self.p['min_samples_leaf']))
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(str(self.p['min_samples_leaf'])):
            data['min_samples_leaf'] = float(self.p['min_samples_leaf'])
        else:
            data['min_samples_leaf'] = 2

        # min_weight_fraction_leaf
        if re.compile(r'^\s*\d+\s*$') \
                .search(str(self.p['min_weight_fraction_leaf'])):
            data['min_weight_fraction_leaf'] = \
                float(self.p['min_weight_fraction_leaf'])
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(str(self.p['min_weight_fraction_leaf'])):
            data['min_weight_fraction_leaf'] = \
                float(self.p['min_weight_fraction_leaf'])
        else:
            data['min_weight_fraction_leaf'] = 0.0

        # max_features
        opt = ['auto', 'sqrt', 'log2']
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['max_features'])):
            data['max_features'] = int(float(self.p['max_features']))
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(str(self.p['max_features'])):
            data['max_features'] = float(self.p['max_features'])
        elif self.isvalidoption(self.p['max_features'], opt):
            data['max_features'] = str(self.p['max_features'])
        else:
            data['max_features'] = 'auto'

        data['max_leaf_nodes'] = self.mkint(self.p['max_leaf_nodes'], None)
        data['min_impurity_decrease'] = \
            self.mkfloat(self.p['min_impurity_decrease'], 0.0)
        data['bootstrap'] = self.mkbool(self.p['bootstrap'], True)
        data['oob_score'] = self.mkbool(self.p['oob_score'], False)
        data['n_jobs'] = self.mkint(self.p['n_jobs'], None)
        data['random_state'] = self.mkint(self.p['random_state'], None)
        data['verbose'] = self.mkint(self.p['verbose'], 0)
        data['warm_start'] = self.mkbool(self.p['warm_start'], False)

        # class_weight
        opts = ['balanced', 'balanced_subsample']
        if self.p['class_weight'] in opts:
            data['class_weight'] = self.p['class_weight']
        elif self.isdict(self.p['class_weight']):
            data['class_weight'] = self.mkdict(self.p['class_weight'])
        else:
            data['class_weight'] = None

        data['ccp_alpha'] = self.mkposfloat(self.p['ccp_alpha'], 0.0)

        # max_samples
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['max_samples'])):
            data['max_samples'] = int(float(self.p['max_samples']))
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(str(self.p['max_samples'])):
            data['max_samples'] = float(self.p['max_samples'])
        else:
            data['max_samples'] = None

        return data

    def clean_rano(self):
        data = {}

        leaf_pred_opt = ['mc', 'nb', 'nba']
        split_opt = ['gini', 'info_gain', 'hellinger']

        data['n_models'] = self.mkint(self.p['n_models'], 10)

        # max_features
        opt = ['sqrt', 'log2']
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['max_features'])):
            data['max_features'] = int(float(self.p['max_features']))
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(str(self.p['max_features'])):
            data['max_features'] = float(self.p['max_features'])
        elif self.isvalidoption(self.p['max_features'], opt):
            data['max_features'] = str(self.p['max_features'])
        else:
            data['max_features'] = 'sqrt'

        data['lambda_value'] = self.mkint(self.p['lambda_value'], 6)

        # metric
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['metric'])):
            data['metric'] = self.metrics[int(self.p['metric'])]
        else:
            data['metric'] = Accuracy()

        data['disable_weighted_vote'] = \
            self.mkbool(self.p['disable_weighted_vote'], False)

        # drift_detector
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['drift_detector'])):
            data['drift_detector'] = \
                self.detectors[int(self.p['drift_detector'])]
        else:
            data['drift_detector'] = ADWIN()

        # warning_detector
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['warning_detector'])):
            data['warning_detector'] = \
                self.detectors[int(self.p['warning_detector'])]
        else:
            data['warning_detector'] = ADWIN()

        data['grace_period'] = self.mkint(self.p['grace_period'], 50)
        data['max_depth'] = self.mkint(self.p['max_depth'], None)
        data['split_criterion'] = \
            self.mkopt(self.p['split_criterion'], split_opt, 'info_gain')
        data['split_confidence'] = \
            self.mkfloat(self.p['split_confidence'], 0.01)
        data['tie_threshold'] = self.mkfloat(self.p['tie_threshold'], 0.05)
        data['leaf_prediction'] = \
            self.mkopt(self.p['leaf_prediction'], leaf_pred_opt, 'nba')
        data['nb_threshold'] = self.mkint(self.p['nb_threshold'], 0)
        data['nominal_attributes'] = None

        # splitter
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['splitter'])):
            data['splitter'] = self.splitters[int(self.p['splitter'])]
        else:
            data['splitter'] = None

        data['binary_split'] = self.mkbool(self.p['binary_split'], False)
        data['max_size'] = self.mkint(self.p['max_size'], 32)
        data['memory_estimate_period'] = \
            self.mkint(self.p['memory_estimate_period'], 2000000)
        data['stop_mem_management'] = \
            self.mkbool(self.p['stop_mem_management'], False)
        data['remove_poor_attrs'] = \
            self.mkbool(self.p['remove_poor_attrs'], False)
        data['merit_preprune'] = self.mkbool(self.p['merit_preprune'], True)
        data['seed'] = self.mkint(self.p['seed'], None)

        return data

    def clean_treb(self):
        data = {}

        data['criterion'] = \
            self.mkopt(self.p['criterion'], ['gini', 'entropy'], 'gini')
        data['splitter'] = \
            self.mkopt(self.p['splitter'], ['best', 'random'], 'best')
        data['max_depth'] = self.mkint(self.p['max_depth'], None)

        # min_samples_split
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['min_samples_split'])):
            data['min_samples_split'] = int(float(self.p['min_samples_split']))
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(str(self.p['min_samples_split'])):
            data['min_samples_split'] = float(self.p['min_samples_split'])
        else:
            data['min_samples_split'] = 2

        # min_samples_leaf
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['min_samples_leaf'])):
            data['min_samples_leaf'] = int(float(self.p['min_samples_leaf']))
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(str(self.p['min_samples_leaf'])):
            data['min_samples_leaf'] = float(self.p['min_samples_leaf'])
        else:
            data['min_samples_leaf'] = 1

        data['min_weight_fraction_leaf'] = \
            self.mkfloat(self.p['min_weight_fraction_leaf'], 0.0)

        # max_features
        opt = ['auto', 'sqrt', 'log2']
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['max_features'])):
            data['max_features'] = int(float(self.p['max_features']))
        elif re.compile(r'^\s*(\d*\.\d+)|(\d+\.\d*)\s*$') \
                .search(str(self.p['max_features'])):
            data['max_features'] = float(self.p['max_features'])
        elif self.isvalidoption(self.p['max_features'], opt):
            data['max_features'] = str(self.p['max_features'])
        else:
            data['max_features'] = None

        data['random_state'] = self.mkint(self.p['random_state'], None)
        data['max_leaf_nodes'] = self.mkint(self.p['max_leaf_nodes'], None)
        data['min_impurity_decrease'] = \
            self.mkfloat(self.p['min_impurity_decrease'], 0.0)

        # class_weight
        if self.p['class_weight'] == 'balanced':
            data['class_weight'] = self.p['class_weight']
        elif self.isdict(self.p['class_weight']):
            data['class_weight'] = self.mkdict(self.p['class_weight'])
        else:
            data['class_weight'] = None

        data['ccp_alpha'] = self.mkposfloat(self.p['ccp_alpha'], 0.0)

        return data

    def clean_treo(self):
        data = {}

        split_opt = ['gini', 'info_gain', 'hellinger']
        leaf_pred_opt = ['mc', 'nb', 'nba']

        data['grace_period'] = self.mkint(self.p['grace_period'], 200)
        data['max_depth'] = self.mkint(self.p['max_depth'], None)
        data['split_criterion'] = \
            self.mkopt(self.p['split_criterion'], split_opt, 'info_gain')
        data['split_confidence'] = \
            self.mkfloat(self.p['split_confidence'], 1e-07)
        data['tie_threshold'] = self.mkfloat(self.p['tie_threshold'], 0.05)
        data['leaf_prediction'] = \
            self.mkopt(self.p['leaf_prediction'], leaf_pred_opt, 'nba')
        data['nb_threshold'] = self.mkint(self.p['nb_threshold'], 0)
        data['nominal_attributes'] = None

        # splitter
        if re.compile(r'^\s*\d+\s*$').search(str(self.p['splitter'])):
            data['splitter'] = self.splitters[int(self.p['splitter'])]
        else:
            data['splitter'] = None

        data['bootstrap_sampling'] = \
            self.mkbool(self.p['bootstrap_sampling'], True)
        data['drift_window_threshold'] = \
            self.mkint(self.p['drift_window_threshold'], 300)
        data['adwin_confidence'] = \
            self.mkfloat(self.p['adwin_confidence'], 0.002)
        data['binary_split'] = self.mkbool(self.p['binary_split'], False)
        data['max_size'] = self.mkint(self.p['max_size'], 100)
        data['memory_estimate_period'] = \
            self.mkint(self.p['memory_estimate_period'], 1000000)
        data['stop_mem_management'] = \
            self.mkbool(self.p['stop_mem_management'], False)
        data['remove_poor_attrs'] = \
            self.mkbool(self.p['remove_poor_attrs'], False)
        data['merit_preprune'] = self.mkbool(self.p['merit_preprune'], True)
        data['seed'] = self.mkint(self.p['seed'], None)

        return data
